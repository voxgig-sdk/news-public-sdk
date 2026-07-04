package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/news-public-sdk/go"
	"github.com/voxgig-sdk/news-public-sdk/go/core"

	vs "github.com/voxgig-sdk/news-public-sdk/go/utility/struct"
)

func TestNoticiaEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Noticia(nil)
		if ent == nil {
			t.Fatal("expected non-nil NoticiaEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := noticiaBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "noticia." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set NEWSPUBLIC_TEST_NOTICIA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		noticiaRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.noticia", setup.data)))
		var noticiaRef01Data map[string]any
		if len(noticiaRef01DataRaw) > 0 {
			noticiaRef01Data = core.ToMapAny(noticiaRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = noticiaRef01Data

		// LIST
		noticiaRef01Ent := client.Noticia(nil)
		noticiaRef01Match := map[string]any{}

		noticiaRef01ListResult, err := noticiaRef01Ent.List(noticiaRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, noticiaRef01ListOk := noticiaRef01ListResult.([]any)
		if !noticiaRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", noticiaRef01ListResult)
		}

	})
}

func noticiaBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "noticia", "NoticiaTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read noticia test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse noticia test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"noticia01", "noticia02", "noticia03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("NEWSPUBLIC_TEST_NOTICIA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NEWSPUBLIC_TEST_NOTICIA_ENTID": idmap,
		"NEWSPUBLIC_TEST_LIVE":      "FALSE",
		"NEWSPUBLIC_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["NEWSPUBLIC_TEST_NOTICIA_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["NEWSPUBLIC_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewNewsPublicSDK(core.ToMapAny(mergedOpts))
	}

	live := env["NEWSPUBLIC_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["NEWSPUBLIC_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
