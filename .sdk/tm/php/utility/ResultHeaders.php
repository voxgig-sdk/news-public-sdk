<?php
declare(strict_types=1);

// NewsPublic SDK utility: result_headers

class NewsPublicResultHeaders
{
    public static function call(NewsPublicContext $ctx): ?NewsPublicResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
