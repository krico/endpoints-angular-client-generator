module.exports = CodeWriter;
var nop = function () {
};
function CodeWriter(beforeWrite) {
    this.writers = [];
    this.hybridWrite = hybridWrite;
    this.beforeWrite = beforeWrite || nop;
    this.write = write;
    this.append = append;
    this.prepend = prepend;
}

function append(w) {
    this.writers.push(w);
    return this;
}

function prepend(w) {
    this.writers.unshift(w);
    return this;
}

function hybridWrite(funOrStr, out) {
    if (!funOrStr) return;
    var t = Object.prototype.toString.call(funOrStr);
    if (t == '[object Function]') {
        funOrStr(out);
    } else if (t == '[object String]') {
        out.write(funOrStr);
    } else if (t == '[object Array]') {
        var that = this;
        funOrStr.forEach(function (w) {
            that.hybridWrite(w, out);
        });
    } else if (t == '[object Object]' && typeof(funOrStr.write) == 'function') {
        funOrStr.write(out);
    } else {
        throw new Error('Failed to hybrid write "' + t + '": ' + funOrStr);
    }
}

function write(out) {
    this.beforeWrite();
    this.hybridWrite(this.writers, out);
}