<?php
declare(strict_types=1);

// NewsPublic SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NewsPublicFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NewsPublicBaseFeature();
            case "test":
                return new NewsPublicTestFeature();
            default:
                return new NewsPublicBaseFeature();
        }
    }
}
