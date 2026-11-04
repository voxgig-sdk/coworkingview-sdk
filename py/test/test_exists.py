# Coworkingview SDK exists test

import pytest
from coworkingview_sdk import CoworkingviewSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CoworkingviewSDK.test(None, None)
        assert testsdk is not None
