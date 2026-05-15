<?php
declare(strict_types=1);

// NewsPublic SDK utility: feature_add

class NewsPublicFeatureAdd
{
    public static function call(NewsPublicContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
