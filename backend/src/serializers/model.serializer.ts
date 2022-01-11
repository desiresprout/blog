import { instanceToPlain, plainToInstance, type ClassConstructor } from 'class-transformer';

function modelSerializer<J, C>(plain: J | J[], serializer: ClassConstructor<C>) {
  const modelInstance = plainToInstance(serializer, plain, {
    excludeExtraneousValues: false,
  });
  return instanceToPlain(modelInstance);
}

export default modelSerializer;
