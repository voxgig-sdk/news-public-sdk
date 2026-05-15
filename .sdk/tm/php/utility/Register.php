<?php
declare(strict_types=1);

// NewsPublic SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

NewsPublicUtility::setRegistrar(function (NewsPublicUtility $u): void {
    $u->clean = [NewsPublicClean::class, 'call'];
    $u->done = [NewsPublicDone::class, 'call'];
    $u->make_error = [NewsPublicMakeError::class, 'call'];
    $u->feature_add = [NewsPublicFeatureAdd::class, 'call'];
    $u->feature_hook = [NewsPublicFeatureHook::class, 'call'];
    $u->feature_init = [NewsPublicFeatureInit::class, 'call'];
    $u->fetcher = [NewsPublicFetcher::class, 'call'];
    $u->make_fetch_def = [NewsPublicMakeFetchDef::class, 'call'];
    $u->make_context = [NewsPublicMakeContext::class, 'call'];
    $u->make_options = [NewsPublicMakeOptions::class, 'call'];
    $u->make_request = [NewsPublicMakeRequest::class, 'call'];
    $u->make_response = [NewsPublicMakeResponse::class, 'call'];
    $u->make_result = [NewsPublicMakeResult::class, 'call'];
    $u->make_point = [NewsPublicMakePoint::class, 'call'];
    $u->make_spec = [NewsPublicMakeSpec::class, 'call'];
    $u->make_url = [NewsPublicMakeUrl::class, 'call'];
    $u->param = [NewsPublicParam::class, 'call'];
    $u->prepare_auth = [NewsPublicPrepareAuth::class, 'call'];
    $u->prepare_body = [NewsPublicPrepareBody::class, 'call'];
    $u->prepare_headers = [NewsPublicPrepareHeaders::class, 'call'];
    $u->prepare_method = [NewsPublicPrepareMethod::class, 'call'];
    $u->prepare_params = [NewsPublicPrepareParams::class, 'call'];
    $u->prepare_path = [NewsPublicPreparePath::class, 'call'];
    $u->prepare_query = [NewsPublicPrepareQuery::class, 'call'];
    $u->result_basic = [NewsPublicResultBasic::class, 'call'];
    $u->result_body = [NewsPublicResultBody::class, 'call'];
    $u->result_headers = [NewsPublicResultHeaders::class, 'call'];
    $u->transform_request = [NewsPublicTransformRequest::class, 'call'];
    $u->transform_response = [NewsPublicTransformResponse::class, 'call'];
});
