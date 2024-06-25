import Model from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('number') price;
  @attr('number') discount;
  @attr('string') color;
  @attr('string') size;
  @attr('string') dp;
  @attr('string') sellerId;
  @attr('string') gender;
  @attr('string') age;
}
