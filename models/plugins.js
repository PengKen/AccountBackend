module.exports = exports = function lastModifiedPlugin (schema, options) {
    schema.add({ lastMod: Date });

    schema.pre('save', function (next) {
        console.log("save")
        next();
    });

}