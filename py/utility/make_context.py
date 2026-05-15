# NewsPublic SDK utility: make_context

from core.context import NewsPublicContext


def make_context_util(ctxmap, basectx):
    return NewsPublicContext(ctxmap, basectx)
