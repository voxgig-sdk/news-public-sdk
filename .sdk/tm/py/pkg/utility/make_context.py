# NewsPublic SDK utility: make_context

from projectname_sdk.core.context import NewsPublicContext


def make_context_util(ctxmap, basectx):
    return NewsPublicContext(ctxmap, basectx)
