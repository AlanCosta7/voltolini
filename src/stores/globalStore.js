import { defineStore } from 'pinia';

import { $auth, $firestore, $functions, $storage } from '../boot/firebase'
import { doc, getDoc, getDocs, deleteDoc, addDoc, setDoc, updateDoc, collection, query, where, onSnapshot, arrayUnion } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { signInWithEmailAndPassword, onAuthStateChanged, sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";
import { getStorage, ref, uploadBytes, list, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Platform, Notify, Loading } from 'quasar'

import axios from 'axios'

export const useGlobalStore = defineStore('global', {
    state: () => ({
      currentUser: null,
      listaCategoria: [
        {
          label: 'Custom Remodel',
          value: 'custom_remodel'
        },
        {
          label: 'Hardscape',
          value: 'hardscape'
        },
        {
          label: 'Painting Services',
          value: 'painting_services'
        },
        {
          label: 'Accent Wall',
          value: 'accent_wall'
        },
        {
          label: 'Bath Remodel',
          value: 'bath_remodel'
        },
        {
          label: 'Flooring',
          value: 'flooring'
        },
        {
          label: 'Kitchen',
          value: 'kitchen'
        },
        {
          label: 'Others',
          value: 'others'
        }
      ],
      galeria: [],
      antes_depois: [],
      listaGaleria: [],
      listaVideo: [
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Faccent_wall001.mp4?alt=media&token=8ebb3ec5-de92-4628-af44-c294c3aa8d2a',
            select: 'accent_wall'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Faccent_wall002.mp4?alt=media&token=a3a36ab0-b930-421b-b516-5f170813e966',
            select: 'accent_wall'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Faccent_wall003.mp4?alt=media&token=b7ff897c-a82f-48b6-8871-9d41758fcbcb',
            select: 'accent_wall'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fbath_remodel001.mp4?alt=media&token=cf49cab0-92a3-4d18-a2ec-b2ab7c726bd9',
            select: 'bath_remodel'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fbath_remodel002.mp4?alt=media&token=4c8fbb3c-bb8e-441d-bf6d-825de972000a',
            select: 'bath_remodel'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fbath_remodel003.mp4?alt=media&token=34a75c9b-7e9c-49b4-9aff-303a61c0af3f',
            select: 'bath_remodel'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fbath_remodel004.mp4?alt=media&token=015b1a64-325a-4129-81c4-fcefa7e98d72',
            select: 'bath_remodel'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fcustom_remodel001.mp4?alt=media&token=c2295056-57d4-4096-b207-cb26f3db7fc2',
            select: 'custom_remodel'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fcustom_remodel002.mp4?alt=media&token=bc1e04b3-2b5d-4ce6-9e6d-de52bc8f64ce',
            select: 'custom_remodel'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fflooring001.mp4?alt=media&token=d5f445fb-c53c-4418-9a6b-198df217ecf3',
            select: 'flooring'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fflooring002.mp4?alt=media&token=9dcec4d3-0e1d-4768-92a0-8bfde6efc518',
            select: 'flooring'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fkitchen001.mp4?alt=media&token=dbab6432-b171-4673-806b-d3c9406fd3a7',
            select: 'kitchen'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fkitchen002.mp4?alt=media&token=aa60b7cb-d379-48f9-b84d-d943c8a399df',
            select: 'kitchen'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fkitchen003.mp4?alt=media&token=10c2982f-c131-4d59-aeaf-3b3f3cca6e36',
            select: 'kitchen'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fpainting_services001.mp4?alt=media&token=841b87d0-f6ad-4260-abd7-a3c2de5eb609',
            select: 'painting_services'
          }
        },
        {
          id: null,
          data: {
            link: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/video%2Fbath_remodel005.mp4?alt=media&token=ff10e905-9a49-4481-8c3d-82247f4dec82',
            select: 'bath_remodel'
          }
        }
      ],
      listaDestaque: [
          {
              text: 'Transform your space with our Custom Remodel service, where we bring your design dreams to life, tailored to your unique style and preferences.',
              img: 'https://storage.googleapis.com/download/storage/v1/b/voltolini-home-improvement.appspot.com/o/galeria%2Fcustom_remodel%2Fall%2F9d0bd5d3-5e7e-44a8-ab78-43a57e7423b5_1600x1600?generation=1715007391629581&alt=media',
              direcao: true,
              index: 0
          },
          {
              text: 'Experience the artistry of our Painting Services, where every stroke brings personality and vibrancy to your interiors, turning your vision into a masterpiece.',
              img: 'https://storage.googleapis.com/download/storage/v1/b/voltolini-home-improvement.appspot.com/o/galeria%2Fpainting_services%2Fall%2Febfc5b43-18b6-438a-b180-cc1cd17d2157_1600x1600?generation=1715008320500923&alt=media',
              direcao: false,
              index: 1
          },
          {
              text: 'The bathroom is the place where you search for more privacy in your home. We can help you achieve your highest expectations towards whats the perfect bathroom for you.',
              img: 'https://storage.googleapis.com/download/storage/v1/b/voltolini-home-improvement.appspot.com/o/galeria%2Fbath_remodel%2Fall%2Fcd578556-c736-4d47-8818-3f98ab2d3f5b_1600x1600?generation=1715008529794394&alt=media',
              direcao: true,
              index: 2
          },
          {
              text: 'The kitchen is the heart of your home, where you show love for your family and friends and spend quality time with your loved ones. Renovating your kitchen brings a significant value to your home. this is one of the biggest investments you can make for your family and your home.',
              img: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/galeria%2Fkitchen%2Fall%2FWhatsApp%20Image%202024-05-23%20at%2010.41.47_1600x1600.webp?alt=media&token=49524bce-7e52-41ac-a93c-23ce4d00a1f3',
              direcao: false,
              index: 3
          },
          {
              text: 'Elevate your exterior with our expert hardscape solutions. We are passionate about designing and building outdoor spaces that supplement your lifestyle.',
              img: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/galeria%2Fhardscape%2Fall%2FWhatsApp%20Image%202024-05-20%20at%2014.01.29_1600x1600.webp?alt=media&token=225c24aa-91e3-4ec3-b6a2-c19ad44745bd',
              direcao: true,
              index: 4
          },
          {
              text: 'We know that the flooring of a space can completely transform its feel and functionality. That`s why we offer a wide variety of high-quality options to meet all your needs, ensuring you find the perfect solution for every type of environment.',
              img: 'https://firebasestorage.googleapis.com/v0/b/voltolini-home-improvement.appspot.com/o/galeria%2Fflooring%2Fall%2FWhatsApp%20Image%202024-05-23%20at%2011.14.18_1600x1600.webp?alt=media&token=53f6635a-ab11-4665-a681-1d76fe9c8a9e',
              direcao: false,
              index: 5
          },
          {
              text: 'And besides all those, we do all types of handmen work, demolition , Fences, accent wall, pressure washer and clean.',
              img: 'https://storage.googleapis.com/download/storage/v1/b/voltolini-home-improvement.appspot.com/o/galeria%2Faccent_wall%2Fall%2F90a71302-ac93-472a-9075-64cb7c47148e_1600x1600?generation=1716227470784332&alt=media',
              direcao: true,
              index: 6
          },
      ],
      errors: {
        'auth/app-deleted': 'O banco de dados não foi localizado.',
        'auth/expired-action-code': 'O código da ação o ou link expirou.',
        'auth/invalid-action-code': 'O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.',
        'auth/user-disabled': 'O usuário correspondente à credencial fornecida foi desativado.',
        'auth/user-not-found': 'O usuário não correponde à nenhuma credencial.',
        'auth/weak-password': 'A senha é muito fraca.',
        'auth/email-already-in-use': 'Já existi uma conta com o endereço de email fornecido.',
        'auth/invalid-email': 'O endereço de e-mail não é válido.',
        'auth/operation-not-allowed': 'O tipo de conta correspondente à esta credencial, ainda não encontra-se ativada.',
        'auth/account-exists-with-different-credential': 'E-mail já associado a outra conta.',
        'auth/auth-domain-config-required': 'A configuração para autenticação não foi fornecida.',
        'auth/credential-already-in-use': 'Já existe uma conta para esta credencial.',
        'auth/operation-not-supported-in-this-environment': 'Esta operação não é suportada no ambiente que está sendo executada. Verifique se deve ser http ou https.',
        'auth/timeout': 'Excedido o tempo de resposta. O domínio pode não estar autorizado para realizar operações.',
        'auth/missing-android-pkg-name': 'Deve ser fornecido um nome de pacote para instalação do aplicativo Android.',
        'auth/missing-continue-uri': 'A próxima URL deve ser fornecida na solicitação.',
        'auth/missing-ios-bundle-id': 'Deve ser fornecido um nome de pacote para instalação do aplicativo iOS.',
        'auth/invalid-continue-uri': 'A próxima URL fornecida na solicitação é inválida.',
        'auth/unauthorized-continue-uri': 'O domínio da próxima URL não está na lista de autorizações.',
        'auth/invalid-dynamic-link-domain': 'O domínio de link dinâmico fornecido, não está autorizado ou configurado no projeto atual.',
        'auth/argument-error': 'Verifique a configuração de link para o aplicativo.',
        'auth/invalid-persistence-type': 'O tipo especificado para a persistência dos dados é inválido.',
        'auth/unsupported-persistence-type': 'O ambiente atual não suportar o tipo especificado para persistência dos dados.',
        'auth/invalid-credential': 'A credencial expirou ou está mal formada.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/invalid-verification-code': 'O código de verificação da credencial não é válido.',
        'auth/invalid-verification-id': 'O ID de verificação da credencial não é válido.',
        'auth/custom-token-mismatch': 'O token está diferente do padrão solicitado.',
        'auth/invalid-custom-token': 'O token fornecido não é válido.',
        // 'auth/invalid-email': 'O endereço de e-mail não é válido.',
        'auth/captcha-check-failed': 'O token de resposta do reCAPTCHA não é válido, expirou ou o domínio não é permitido.',
        'auth/invalid-phone-number': 'O número de telefone está em um formato inválido (padrão E.164).',
        'auth/missing-phone-number': 'O número de telefone é requerido.',
        'auth/quota-exceeded': 'A cota de SMS foi excedida.',
        'auth/cancelled-popup-request': 'Somente uma solicitação de janela pop-up é permitida de uma só vez.',
        'auth/popup-blocked': 'A janela pop-up foi bloqueado pelo navegador.',
        'auth/popup-closed-by-user': 'A janela pop-up foi fechada pelo usuário sem concluir o login no provedor.',
        'auth/unauthorized-domain': 'O domínio do aplicativo não está autorizado para realizar operações.',
        'auth/invalid-user-token': 'O usuário atual não foi identificado.',
        'auth/user-token-expired': 'O token do usuário atual expirou.',
        'auth/null-user': 'O usuário atual é nulo.',
        'auth/app-not-authorized': 'Aplicação não autorizada para autenticar com a chave informada.',
        'auth/invalid-api-key': 'A chave da API fornecida é inválida.',
        'auth/network-request-failed': 'Falha de conexão com a rede.',
        'auth/requires-recent-login': 'O último horário de acesso do usuário não atende ao limite de segurança.',
        'auth/too-many-requests': 'As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.',
        'auth/web-storage-unsupported': 'O navegador não suporta armazenamento ou se o usuário desativou este recurso.',
        'auth/invalid-claims': 'Os atributos de cadastro personalizado são inválidos.',
        'auth/claims-too-large': 'O tamanho da requisição excede o tamanho máximo permitido de 1 Megabyte.',
        'auth/id-token-expired': 'O token informado expirou.',
        'auth/id-token-revoked': 'O token informado perdeu a validade.',
        'auth/invalid-argument': 'Um argumento inválido foi fornecido a um método.',
        'auth/invalid-creation-time': 'O horário da criação precisa ser uma data UTC válida.',
        'auth/invalid-disabled-field': 'A propriedade para usuário desabilitado é inválida.',
        'auth/invalid-display-name': 'O nome do usuário é inválido.',
        'auth/invalid-email-verified': 'O e-mail é inválido.',
        'auth/invalid-hash-algorithm': 'O algoritmo de HASH não é uma criptografia compatível.',
        'auth/invalid-hash-block-size': 'O tamanho do bloco de HASH não é válido.',
        'auth/invalid-hash-derived-key-length': 'O tamanho da chave derivada do HASH não é válido.',
        'auth/invalid-hash-key': 'A chave de HASH precisa ter um buffer de byte válido.',
        'auth/invalid-hash-memory-cost': 'O custo da memória HASH não é válido.',
        'auth/invalid-hash-parallelization': 'O carregamento em paralelo do HASH não é válido.',
        'auth/invalid-hash-rounds': 'O arredondamento de HASH não é válido.',
        'auth/invalid-hash-salt-separator': 'O campo do separador de SALT do algoritmo de geração de HASH precisa ser um buffer de byte válido.',
        'auth/invalid-id-token': 'O código do token informado não é válido.',
        'auth/invalid-last-sign-in-time': 'O último horário de login precisa ser uma data UTC válida.',
        'auth/invalid-page-token': 'A próxima URL fornecida na solicitação é inválida.',
        'auth/invalid-password': 'A senha é inválida, precisa ter pelo menos 6 caracteres.',
        'auth/invalid-password-hash': 'O HASH da senha não é válida.',
        'auth/invalid-password-salt': 'O SALT da senha não é válido.',
        'auth/invalid-photo-url': 'A URL da foto de usuário é inválido.',
        'auth/invalid-provider-id': 'O identificador de provedor não é compatível.',
        'auth/invalid-session-cookie-duration': 'A duração do COOKIE da sessão precisa ser um número válido em milissegundos, entre 5 minutos e 2 semanas.',
        'auth/invalid-uid': 'O identificador fornecido deve ter no máximo 128 caracteres.',
        'auth/invalid-user-import': 'O registro do usuário a ser importado não é válido.',
        'auth/invalid-provider-data': 'O provedor de dados não é válido.',
        'auth/maximum-user-count-exceeded': 'O número máximo permitido de usuários a serem importados foi excedido.',
        'auth/missing-hash-algorithm': 'É necessário fornecer o algoritmo de geração de HASH e seus parâmetros para importar usuários.',
        'auth/missing-uid': 'Um identificador é necessário para a operação atual.',
        'auth/reserved-claims': 'Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas.',
        'auth/session-cookie-revoked': 'O COOKIE da sessão perdeu a validade.',
        'auth/uid-alread-exists': 'O indentificador fornecido já está em uso.',
        'auth/email-already-exists': 'O e-mail fornecido já está em uso.',
        'auth/phone-number-already-exists': 'O telefone fornecido já está em uso.',
        'auth/project-not-found': 'Nenhum projeto foi encontrado.',
        'auth/insufficient-permission': 'A credencial utilizada não tem permissão para acessar o recurso solicitado.',
        'auth/internal-error': 'O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.'
      },
    }),
    getters: {
      mobile() {
          return Platform?.is?.mobile ? true : false
      },
    },
    actions: {
      handleCallback(payload) {
        if(payload.type && payload.message) {
            Notify.create({
                type: payload.type,
                message: payload.message,
                timeout: 2000,
            })
        }
      },
      async setCurrentUser(userCredential) {

        const {uid, email, emailVerified, displayName, photoURL, providerData, phoneNumber} = userCredential
        const providerId = providerData && providerData.length > 0 ? providerData[0].providerId : userCredential.providerId

        this.currentUser = {
          uid,
          email,
          emailVerified,
          displayName,
          photoURL,
          providerId,
          phoneNumber,
        }
        return this.currentUser
      },
      async signInWithEmailAndPassword(payload) {
        let his = this
        let email = payload.email
        let password = payload.password
        console.log('email', email, 'password', password)
        const currentUser = $auth.currentUser;
        if(!currentUser) {
          let result = signInWithEmailAndPassword($auth, email, password)
          .then(async (userCredential) => {
            // Signed in

            await this.setCurrentUser(userCredential.user)
            //return result
            // ...
            return true
          })
          .catch((error) => {
            let code = error.code;
            his.error = error
            console.log('error', error)
            if(code) {
              var throwError = !!his.errors[code] ? his.errors[code] : 'Ops!'
              let val = {
                type: "negative",
                message: throwError
              }
              his.handleCallback(val)
            }

            return false

          })
          return result
        } else {
          await this.setCurrentUser(currentUser)
          return false
        }

      },
      async isOnAuthStateChanged() {
        return onAuthStateChanged($auth, async (user) => {
          if (user) {
            console.log('isOnAuthStateChanged', user)
            this.setCurrentUser(user)
            return user
          } else {
            console.log('isOnAuthStateChanged null')

            setTimeout(() => {
              this.setCurrentUser(null)
            }, 2000);

            return null
          }
        });
      },
      async signOut() {

        Dialog.create({
          title: "Deslogar",
          message: "Tem certeza que deseja sair?",
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            // Sign-out successful.

            let val = {
              type: "positive",
              message: "Você foi deslogado com sucesso",
            }
            this.handleCallback(val)

            await $auth.signOut()

          })
          .onCancel(() => {
            return false
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            return false
            // console.log('I am triggered on both OK and Cancel')
          });
      },
      async promiseAll() {
          let lista = ['galeria', 'antes_depois']
          for (let i = 0; i < lista.length; i++) {
            const element = lista[i];
            await this.getCollection(element)
          }

          return true
        },
      async getCollection(item) {
          if(item) {
          const q = query(collection($firestore, item));

          onSnapshot(q, (querySnapshot) => {
              const lista = [];
              querySnapshot.forEach((doc) => {
              let val = {
                  id: doc.id,
                  data: doc.data()
              }
              lista.push(val);
              });
              switch (item) {
                case 'galeria':
                    this.galeria = lista
                    break;
                case 'antes_depois':
                    this.antes_depois = lista
                    break;
              default:
                  break;
              }
          });

          }

      },
      async sendHttpCall(payload) {

          const send = httpsCallable($functions, payload.functions);
          const result = await send(payload.data).then((result) => {
              const data = result?.data;
              return data
          }).catch((error) => {
              console.log('sendHttpCall', error)
              return {error: error}
          })

          return result
      },
      async getImg(item) {
          this.listaGaleria = []
          console.log('res', item)

          const listRef = ref($storage, `galeria/${item}/all`);
          // Find all the prefixes and items.
          return list(listRef)
          .then((res) => {
              console.log('res', res)
              for (let i = 0; i < res.items.length; i++) {
                  const itemRef = res.items[i];
                  const starsRef = ref($storage, itemRef.fullPath);

                  getDownloadURL(starsRef)
                  .then((url) => {
                      console.log('getDownloadURL', url)
                      let a = url.split('.webp')
                      let b = a[0].split('_')
                      let c = b[1]

                      switch (c) {
                          case '200x200':
                              this.listaGaleria.push({
                                  img_200: url
                              })

                              break;
                          case '400x400':
                              this.listaGaleria.push({
                                  img_400: url
                              })

                              break;
                          case '600x600':
                              this.listaGaleria.push({
                                  img_600: url
                              })

                              break;
                          case '800x800':
                              this.listaGaleria.push({
                                  img_800: url
                              })

                              break;
                          case '1600x1600':
                              this.listaGaleria.push({
                                  img_1600: url
                              })

                              break;

                          default:
                              break;
                      }

                      // https://firebasestorage.googleapis.com/v0/b/quality-upholstery.appspot.com/o/galeria%2FCustom%20pieces%2F8_800x800.webp?alt=media&token=8b649996-3d42-4cd5-bfe8-f2e000747342
                      // Insert url into an <img> tag to "download"
                  })
                  .catch((error) => {
                      // A full list of error codes is available at
                      // https://firebase.google.com/docs/storage/web/handle-errors
                      switch (error.code) {
                      case 'storage/object-not-found':
                          // File doesn't exist
                          break;
                      case 'storage/unauthorized':
                          // User doesn't have permission to access the object
                          break;
                      case 'storage/canceled':
                          // User canceled the upload
                          break;

                      // ...

                      case 'storage/unknown':
                          // Unknown error occurred, inspect the server response
                          break;
                      }
                  });
              }

              return res
          }).catch((error) => {
              console.log('error:', error)
          });
      },
      async uploadPhotoURL(payload) {
        console.log('uploadPhotoURL:', payload);

        let his = this
        Loading.show({
          html: true,
          message: '<h3>Salvando imagem...</h3>'
        })

        const id = payload.id;
        // galeria ou antes_depois
        const collectionName = payload.collectionName;
        const files = payload.files;

        //Categoria
        const select = payload.select;

        // antes, depois, all
        const type = payload.type

        if (!files) {
          return;
        } else {

          // galeria/custom_remodel/all/xxxxxx
          const storageRef = `${collectionName}/${select}/${type}/${id}`

          const uidRef = ref($storage, storageRef)

          const uploadTask = uploadBytesResumable(uidRef, files);

          uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;

                // ...

                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
              });
            }
          );
        }

        Loading.hide()

      },
      async saveDocsId(payload) {
        console.log('saveDocsId', payload)
        return await setDoc(doc($firestore, payload.collection, payload.id), payload.data)
        .then(() => {
          let val = {
            type: "positive",
            message: "Salvo com sucesso",
          }

          this.handleCallback(val)
          return true
        })
        .catch((error) => {
          console.error("Error writing document: ", error);

          let val = {
            type: "negative",
            message: 'Ops! não foi possível salvar'
          }
          this.handleCallback(val)
          return {error: error}
        });
      },
      async deleteDocs(payload) {

        await deleteDoc(doc($firestore, payload.collection, payload.id))
        .then(() => {
          let val = {
            type: "positive",
            message: 'Deletado com sucesso',
          }
          this.handleCallback(val)
        })
        .catch((error) => {
          console.error("Error writing document: ", error);

          let val = {
            type: "negative",
            message: 'Ops! não foi possível deletar',
          }
          this.handleCallback(val)

        });

      },

    }
})
