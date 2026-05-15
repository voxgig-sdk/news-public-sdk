package voxgignewspublicsdk

import (
	"github.com/voxgig-sdk/news-public-sdk/core"
	"github.com/voxgig-sdk/news-public-sdk/entity"
	"github.com/voxgig-sdk/news-public-sdk/feature"
	_ "github.com/voxgig-sdk/news-public-sdk/utility"
)

// Type aliases preserve external API.
type NewsPublicSDK = core.NewsPublicSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NewsPublicEntity = core.NewsPublicEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NewsPublicError = core.NewsPublicError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewNoticiaEntityFunc = func(client *core.NewsPublicSDK, entopts map[string]any) core.NewsPublicEntity {
		return entity.NewNoticiaEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNewsPublicSDK = core.NewNewsPublicSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
