export default function responseTransformer(req, res, next) {
  res.success = function (data = {}, meta = {}) {
    return res.status(meta.status || 200).json({
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    });
  };
  next();
}
