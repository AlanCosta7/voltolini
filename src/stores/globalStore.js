import { defineStore } from 'pinia';

import { $auth, $firestore, $functions, $storage } from '../boot/firebase'
import { doc, getDoc, getDocs, deleteDoc, addDoc, setDoc, updateDoc, collection, query, where, onSnapshot, arrayUnion } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getStorage, ref, uploadBytes, list, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Platform, Notify } from 'quasar'

import axios from 'axios'

export const useGlobalStore = defineStore('global', {
    state: () => ({
        listaGaleria: [],
        listaDestaque: [
            {
                text: 'Transform your space with our Custom Remodel service, where we bring your design dreams to life, tailored to your unique style and preferences.',
                img: 'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FCustom%20Remodel%2Fthumbs%2FWhatsApp%20Image%202023-12-19%20at%2014.29.33%20(3)_1600x1600.webp?alt=media&token=6fea5117-8e61-4855-b8a9-469cc218f893',
                direcao: true,
                index: 0
            },
            {
                text: 'Experience the artistry of our Painting Services, where every stroke brings personality and vibrancy to your interiors, turning your vision into a masterpiece.',
                img: 'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2Fthumbs%2FWhatsApp%20Image%202023-12-29%20at%2013.49.21_1600x1600.webp?alt=media&token=8c2d0fd9-3f60-4349-8525-35ba32f03cd6',
                direcao: false,
                index: 1
            },
            {
                text: 'The bathroom is the place where you search for more privacy in your home We can help you achieve your highest expectations  towards whats the perfect bathroom for you',
                img: 'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2FBath%20Remodel%2Fthumbs%2FWhatsApp%20Image%202023-12-19%20at%2014.32.22%20(16)_1600x1600.webp?alt=media&token=83918a90-fe8d-42bf-bcf4-48bebe1e4c05',
                direcao: true,
                index: 2
            },
            {
                text: 'The kitchen is the heart of your home, where you show love for your family and friends and spend quality time with your loved ones Renovating your kitchen brings a significant value to your home, this is one of the biggest investments you can make for your family and your home',
                img: 'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2Fthumbs%2FWhatsApp%20Image%202023-12-29%20at%2015.46.57_1600x1600.webp?alt=media&token=ef9d664f-089c-4ce1-a31b-74360bebe9c8',
                direcao: false,
                index: 3
            },
            {
                text: 'Elevate your exterior with our expert hardscape solutions, we are passionate about designing and building outdoor spaces that supplement your lifestyle.',
                img: 'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2Fthumbs%2FWhatsApp%20Image%202023-12-29%20at%2012.35.39_1600x1600.webp?alt=media&token=c8d76d42-f9b0-4111-88e9-e04ae12fe51f',
                direcao: true,
                index: 4
            },
            {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus leo non felis varius, at pharetra just',
                img: 'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2Fthumbs%2FWhatsApp%20Image%202023-12-29%20at%2015.55.20_1600x1600.webp?alt=media&token=51133b3b-b254-429a-9143-3d3560008605',
                direcao: false,
                index: 5
            },
            {
                text: 'And besides all those, we do all types of handmen work, demolition , Fences, accent wall, pressure washer and clean.',
                img: 'https://firebasestorage.googleapis.com/v0/b/lt-constructionfl.appspot.com/o/voltolini%2Fthumbs%2FWhatsApp%20Image%202023-12-29%20at%2015.54.51_1600x1600.webp?alt=media&token=163a1986-4484-4f6f-ab44-7120a9542b21',
                direcao: true,
                index: 6
            },
        ]
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
        async promiseAll() {
            let lista = ['galeria']
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
                    this.listaGaleria = lista
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

            const listRef = ref($storage, `voltolini/${item}/thumbs`);
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
        }

    }
})
