<template>
  <section class="container mt-6">
    <h2 class="topic mb-4">行程分類</h2>
    <ul class="row list-unstyled">
      <li v-for="(item, index) in categories" :key="index"
       class="col-6 col-md-3 text-center cursor mb-4 mb-md-0 hover-up"
       @click="goCategory(item.category)"
      >
        <div class="p-4 shadow-sm bg-primary-light">
        <img :src="item.imageUrl" alt="類別圖片" style="height:64px">
           <h3 class="h5 mt-3 text-primary fw-bold mb-0">{{ item.category }}</h3>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const data = reactive({
      categories: [
        {
          category: '美洲',
          imageUrl:
            'https://storage.googleapis.com/vue-course-api.appspot.com/starlightselection/1629103840569.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hTOCzv7BwXNTOs41di9XkjPUoR6MNl25sy7ybhICO3Jmtsi%2FHEn%2BbDmT3u3mouZ23uxl113U1zswVqmKNax5YxVxDG%2FG9aPzqvY2hBuTN3qugP5VeaBtr0Hxz49%2BTEhLsUG7xn1hPvCZAor5H%2BylJd3MMTayiDoV9wn%2B4SxofsOLpWf7qvC7FUro0vwPjEaLH4X6qI3XNcQqmS%2Bf8Xf%2F%2FYk0Kf2II0i7HvRB9POXYLU6HxDJWMfNctlYbwfTiCC7vAq7833zRQZzPKHZwZgiv1KtumXO8Qx6iJBdLexRcTJw2HVxGXEswZUHHKY3FcIzi2LUH7ARXWhOKf67s9Krgg%3D%3D',
        },
        {
          category: '亞洲',
          imageUrl:
            'https://storage.googleapis.com/vue-course-api.appspot.com/starlightselection/1629104010327.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OxRNPqRrxk%2Bu03zSY1oMegliI4dRAwe4Ehuj5AFGdM2o4P17%2FRr9s432qBK3uybAVQNHBXUqpf9k44RKMJFOUEPNFlHczuupNDpXyUFkr9JCb7Y6pcHggYQ%2BND5%2Bq%2FiHw3aHBtiUgBs2YxRfFozQmr24WDEpZZqjS48X8yz2VUE%2BLx9lzMqIcnuCIC3PU7QIgnPdreQ55RR6M1810fQURYG6k9xbEMuwdHMrN%2B8D9xcsCiqqGBMmZUMovvyUCajpeBkBtX7ZwAB%2BrxUpCE5ey6UrWDKB0wmTXGVYFvowpVAK5dR0rFJ6w5RsEjNn7fJFwbdb5F4nmy%2BF0drD6PfYag%3D%3D',
        },
        {
          category: '歐洲',
          imageUrl:
            'https://storage.googleapis.com/vue-course-api.appspot.com/starlightselection/1629106835429.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mR5TVFGPtxCB5n48tGh2yZuSl2Q99jnvoM87dZjVIcSos1z6w5W0cYupsvm3xsNA%2BcaLohgwRgJ%2B2L2U2FJpwiRH2ftdCOpem2%2Bf0kJa6PQ5fgBbTKUD6waCs76OC0gko7hPX68p6LSibNUPjFZdbbDSyxy8YN0gtzTJCdpDZQ8xa12DYW2ixNpEj%2Fv11AIVPvGdFGmve5AqEEM3RRCLX9uzYpKSIUeJdLM9YRniYPIXmC8%2B1ri8ff%2Fo8U5OUPoaLEM7ljQXMtAXIIFVCq%2FAx4SprspZ2f1z66HbFmwrjaipngfsP6HbRMkZnCWQispN0rhgcqGmJq0%2BZ%2Fm8nuFxBw%3D%3D',
        },
        {
          category: '大洋洲',
          imageUrl:
            'https://storage.googleapis.com/vue-course-api.appspot.com/starlightselection/1629104050791.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=O5RjhI9KFbwGc%2B6UC2%2FQBFGzxI45M9SLH3WZ9JP%2FSweesG0TMRnjukWQN9qz0zfn44kGzToRaTDznMEp4Kg%2FY4UnQumfZNvhbQdpV79A53m6bkus2BDod065c%2BXoWqXQoa7Rvyi68%2BmqvWqXO1ryvkkPTsjep1iuNTCan4ba1eYXrtNAR6S%2FJEtGDNUDAunbV1Ddq7w2%2Bv2JUTh64XQ%2FhIOnCWEWnioMmw6Cie2LToXkUQy2po1NTEv7zwrmIGXs3Obv95nuL3JTJVYlOTXfX0vnirogUe7vUUnLbAop1KKpve7BiFGiO%2BXEO4qxvS5tJdqQHpoFcpouPTxKpK%2B85w%3D%3D',
        },
      ],
    });
    const refData = toRefs(data);
    function goCategory(name) {
      router.push({
        name: 'Products',
        params: { categoryName: name },
      });
    }
    return {
      ...refData,
      goCategory,
    };
  },
};
</script>

<style>

</style>
