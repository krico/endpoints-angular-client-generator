/**
 * Statement - smallest standalone element
 */
module.exports = Statement;

function Statement(data) {
    this.write = write;
    this._write = _write;
    this.data = data || '';
}

function _write(out) {
    return out.write(this.data);
}

function write(out) {
    return this._write(out);
}