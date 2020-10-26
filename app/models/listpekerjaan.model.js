module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nama_pekerjaan: String,
            tanggal_perkerjaan: String,
            komentar : String,
            status : String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Listpekerjaan = mongoose.model("list", schema);
    return Listpekerjaan;
};