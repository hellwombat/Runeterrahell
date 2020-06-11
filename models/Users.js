// const Knex = require('knex');
const { Model } = require('objection');

class User extends Model {
    static get tableName() {
      return 'users';
    }
  
    // static get relationMappings() {
    //   return {
    //     children: {
    //       relation: Model.HasManyRelation,
    //       modelClass: Person,
    //       join: {
    //         from: 'persons.id',
    //         to: 'persons.parentId'
    //       }
    //     }
    //   };
    // }
  }

module.exports = User;

