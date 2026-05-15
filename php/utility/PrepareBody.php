<?php
declare(strict_types=1);

// NewsPublic SDK utility: prepare_body

class NewsPublicPrepareBody
{
    public static function call(NewsPublicContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
