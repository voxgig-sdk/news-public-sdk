# NewsPublic SDK feature factory

from newspublic_sdk.feature.base_feature import NewsPublicBaseFeature
from newspublic_sdk.feature.test_feature import NewsPublicTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NewsPublicBaseFeature(),
        "test": lambda: NewsPublicTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
