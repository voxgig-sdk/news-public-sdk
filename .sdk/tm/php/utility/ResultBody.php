<?php
declare(strict_types=1);

// NewsPublic SDK utility: result_body

class NewsPublicResultBody
{
    public static function call(NewsPublicContext $ctx): ?NewsPublicResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
