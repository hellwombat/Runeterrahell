// const Knex = require('knex');
const { Model } = require('objection');

class Deck extends Model {
    static get tableName() {
      return 'decks';
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

module.exports = Deck;

