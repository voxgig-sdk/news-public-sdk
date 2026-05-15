# ProjectName SDK exists test

import pytest
from newspublic_sdk import NewsPublicSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NewsPublicSDK.test(None, None)
        assert testsdk is not None
