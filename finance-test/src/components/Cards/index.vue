<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from "swiper";
import { useStore } from 'vuex'
import { ref, reactive, computed } from 'vue'
import CreateCardModal from '@/components/Modal/CreateCardModal.vue'
import getCards from '../../composables/getCards'
import "swiper/css/pagination";
import 'swiper/css';
export default {
  components: {
    Swiper,
    SwiperSlide,
    CreateCardModal
  },
  setup() {
    const nameCard = ref('')
    
    // Call Api
    const { cards, load } = getCards()
    load()

    //Show/hide modal
    const store = useStore()
    const showModal = computed(() => store.state.modal.showing)
    const closeModal = () => {
      store.dispatch('modal/setModal', false)
    }

    // Event Add new Card
    const getRandom = (length) => {
     return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1))
    }

    const getRandomDate = (start, end) => {
       const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
       return`${date.getMonth()}/${date.getFullYear().toString().substr(-2)}`
    }

    const addCard = () => {
      cards.unshift({
        name: nameCard.value,
        number: getRandom(12),
        endDate: getRandomDate(new Date(2025, 0, 1), new Date()),
        cvv: getRandom(3)
      })
      store.dispatch('modal/setModal', false)
    }

    // Event open create new card modal
    const addNewCard = () => {
      store.dispatch('modal/setModal', true)
    }

    return {
      showModal,
      closeModal,
      addNewCard,
      addCard,
      nameCard,
      cards,
      modules: [Pagination],
    };
  }
}
</script>
<template>
  <div> 
    <!-- Header -->
    <div class="header">
      <div class="grid grid-cols-2 header__logo font-bold">
        <span class="grid content-center text-white">Account balance</span>   
        <div class="grid h-12 content-start justify-end">
          <img src="@/assets/images/Logo_no_text.svg" />
        </div>
        </div> 
      <div class="flex justify-between header__price_wrapper">
        <div class="flex justify-start">
          <span class="flex items-content header__currency">S$</span>
          <span class="header__price">3,000</span>
        </div>
        <div class="grid items-center">
          <button @click="addNewCard()" type="button" class="flex header__new_button inline-flex items-center">
            <img src="@/assets/images/box.svg">New card</button>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <ul class="menu">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">My debit cards</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">All company cards</a>
      </li>
    </ul>

    <!-- Cards -->

    <swiper
      :slides-per-view="1"
      :spaceBetween="30"
      :pagination="{
        dynamicBullets: true,
      }"
      :modules="modules"
    >
      <swiper-slide v-for="item in cards" :key="item.id" :class="{'opacity-50' : item.isFreeze}">
        <div class="header__cards">
          <div class="card_header flex w-48 justify-center"> 
            <img class="card_icon_eye" src="@/assets/images/remove_red_eye-24px.svg">
            <span>Show card number</span> 
          </div>
          <div class="card drop-shadow-lg rounded-xl">
            <div class="card_body flex flex-col">
              <div class="flex justify-end card_icon">
                <img src="@/assets/images/Logo.svg">
              </div>
              <div class="card_name">
                {{item.name}}
              </div>
              <div class="card_number">{{item.number}}</div>
              <div class="flex gap-4 card_date_wrapper">
                <span class="card_date">Thru: {{item.endDate}}</span>
                <span class="card_cvv">CVV: </span><span class="card_cvv_code">{{item.cvv}}</span>
              </div>
              <div class="flex justify-end card_logo_visa">
                <img src="@/assets/images/Visa_Logo.svg">
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <Teleport to="body">
      <CreateCardModal :show="showModal" @close="closeModal" @add="addCard">
        <template #header>
          <h3>Create new card</h3>
        </template>
        <template #body>
          <div class="mt-5 md:col-span-2">
            <form novalidate>
              <div class="col-span-12">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Card Name</label>
                <input v-model="nameCard" type="text" name="first-name" id="first-name" class="w-full border-solid border border-slate-300 p-1">
              </div>
            </form>
          </div>
        </template>
      </CreateCardModal>
    </Teleport>
  </div>
</template>
<style lang="scss">
.header {
  &__logo {
    display: flex;
    justify-content: space-between;
    span {
      font-weight: bold;
    }
  }
  &__currency{
    width: 40px;
    height: 30px;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 8pt;
    font-size: 12pt;
    color: #fff;
    background-color: #01D167;
    border-radius: 4px;
  }
  &__price{
    font-size: 24pt;
    color:#fff;
  }
  &__new_button {
    font-size: 13pt;
    color: #23CEFD;
  }

  &__cards {
    position: relative;
    margin-top: 24.5pt;
    .card {
      padding: 12pt;
      background-color: #01D167;
      color: #fff;
      height: 220px;
      position: relative;
      top: -10pt;
   }
    .card_header {
      background-color: #fff;
      color:#01D167;
      display: flex;
      position: relative;
      padding: 8pt 0 15pt 0;
      border-top-left-radius: 6pt;
      border-top-right-radius: 6pt;
      font-size: 12pt;
      margin-left: auto;
      .card_icon_eye {
        padding: 0 5pt;
      }
    }
    .card_name {
      font-weight: bold;
      font-size: 23pt;
    }
    .card_number {
      margin-top: 24pt;
      font-weight: bold;
      font-size: 14pt;
    }
    .card_date_wrapper {
      margin-top: 13pt;
      span {
        font-weight: bold;
      }
      
      font-size: 13pt;
    }
  }
}
.menu {
  display: flex;
  font-size: 13pt;
  .nav-link {
    color:#fff;
    opacity: 0.5;
    display: block;
    padding: 0.5rem 1rem 0 0;
    text-decoration: none;
    &.active {
      font-weight: 500;
      text-decoration: underline;
      text-decoration-color: #23CEFD;
      text-decoration-thickness: 2pt;
      text-underline-position: under;
      opacity: 1;
    }
  }
}

.swiper-pagination-bullets {
  bottom: 0 !important;
  position: absolute;
}

.swiper-pagination-bullet-active-main {
  width: 16px;
  height: 8px;
  border-radius: 8px;
  background: #01D167
}
</style>