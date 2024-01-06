// TODO: #174 include a base model class for all models.
class QJModel {
    created_at: Date;
    updated_at: Date;
    constructor() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}