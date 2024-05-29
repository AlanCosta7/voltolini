import { functions, firestore } from '../commons-init'

const Logger = functions.logger


export const generateThumbnail = functions.storage.object().onFinalize(async (object) => {
  // ...

  const link = object.mediaLink
  Logger.log('link', link)

  const filePath:any = object?.name
  Logger.log('filePath', filePath)

  const pathName = filePath.split('/')

  const collectionName = pathName[0]
  Logger.log('collectionName', collectionName)

  const select = pathName[1]
  Logger.log('select', select)

  const type = pathName[2]
  Logger.log('type', type)

  const isID = pathName[3]
  Logger.log('isID', isID)

  const id = isID.split('_')[0]
  Logger.log('id', id)

  const pathSize = isID.split('_')[1]
  Logger.log('pathSize', pathSize)

  const size = pathSize.split('x').pop()
  Logger.log('size', size)

  if (collectionName == 'galeria') {
    switch (size) {
      case '200':
        await firestore.collection(collectionName).doc(id).update({
          imagem_200: link,
        })
        break
      case '400':
        await firestore.collection(collectionName).doc(id).update({
          imagem_400: link,
        })
        break
      case '600':
        await firestore.collection(collectionName).doc(id).update({
          imagem_600: link,
        })
        break
      case '800':
        await firestore.collection(collectionName).doc(id).update({
          imagem_800: link,
        })
        break
      case '1600':
        await firestore.collection(collectionName).doc(id).update({
          imagem_1600: link,
        })
        break
      default:
        break
    }
  } else {
    if(type == 'antes') {
      switch (size) {
        case '200':
          await firestore.collection(collectionName).doc(id).update({
            antes_imagem_200: link,
          })
          break
        case '400':
          await firestore.collection(collectionName).doc(id).update({
            antes_imagem_400: link,
          })
          break
        case '600':
          await firestore.collection(collectionName).doc(id).update({
            antes_imagem_600: link,
          })
          break
        case '800':
          await firestore.collection(collectionName).doc(id).update({
            antes_imagem_800: link,
          })
          break
        case '1600':
          await firestore.collection(collectionName).doc(id).update({
            antes_imagem_1600: link,
          })
          break
        default:
          break
      }
    } else {
      switch (size) {
        case '200':
          await firestore.collection(collectionName).doc(id).update({
            depois_imagem_200: link,
          })
          break
        case '400':
          await firestore.collection(collectionName).doc(id).update({
            depois_imagem_400: link,
          })
          break
        case '600':
          await firestore.collection(collectionName).doc(id).update({
            depois_imagem_600: link,
          })
          break
        case '800':
          await firestore.collection(collectionName).doc(id).update({
            depois_imagem_800: link,
          })
          break
        case '1600':
          await firestore.collection(collectionName).doc(id).update({
            depois_imagem_1600: link,
          })
          break
        default:
          break
      }
    }
  }


})

