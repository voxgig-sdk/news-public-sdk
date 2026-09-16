# NewsPublic SDK feature factory

from newspublic_sdk.feature.base_feature import NewsPublicBaseFeature
from newspublic_sdk.feature.ratelimit_feature import NewsPublicRatelimitFeature
from newspublic_sdk.feature.retry_feature import NewsPublicRetryFeature
from newspublic_sdk.feature.test_feature import NewsPublicTestFeature
from newspublic_sdk.feature.timeout_feature import NewsPublicTimeoutFeature


_FEATURES = {
    "base": lambda: NewsPublicBaseFeature(),
    "ratelimit": lambda: NewsPublicRatelimitFeature(),
    "retry": lambda: NewsPublicRetryFeature(),
    "test": lambda: NewsPublicTestFeature(),
    "timeout": lambda: NewsPublicTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
