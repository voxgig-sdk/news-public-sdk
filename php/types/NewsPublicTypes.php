<?php
declare(strict_types=1);

// Typed models for the NewsPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Noticia entity data model. */
class Noticia
{
    public string $description;
    public string $image;
    public string $link;
    public string $site_icon;
    public string $title;
}

/** Match filter for Noticia#list (any subset of Noticia fields). */
class NoticiaListMatch
{
    public ?string $description = null;
    public ?string $image = null;
    public ?string $link = null;
    public ?string $site_icon = null;
    public ?string $title = null;
}

