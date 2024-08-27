import BadRequestException from "../exceptions/BadRequestException.js";

export default function validateFieldsDefault (requiredFields, entity) {
  const missingFields = requiredFields.filter(field => !entity[field]);
  const message =  missingFields.length === 1 ?  
    `The ${ missingFields[0]} field is required` :
    `The fields ${missingFields.join(', ')} are requried`

  if (missingFields.length > 0) throw new BadRequestException(message);
}