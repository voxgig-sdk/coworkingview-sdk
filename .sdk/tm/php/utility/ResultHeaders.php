<?php
declare(strict_types=1);

// Coworkingview SDK utility: result_headers

class CoworkingviewResultHeaders
{
    public static function call(CoworkingviewContext $ctx): ?CoworkingviewResult
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
