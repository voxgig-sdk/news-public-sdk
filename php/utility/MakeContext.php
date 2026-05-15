<?php
declare(strict_types=1);

// NewsPublic SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NewsPublicMakeContext
{
    public static function call(array $ctxmap, ?NewsPublicContext $basectx): NewsPublicContext
    {
        return new NewsPublicContext($ctxmap, $basectx);
    }
}
