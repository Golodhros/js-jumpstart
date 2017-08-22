// From Kevin Stone code
[{}, null, undefined, false].forEach(function(falsy) {
    it('should return an empty object for ' + falsy, function() {
        expect(object.method(falsy)).toEqual({});
    });
});