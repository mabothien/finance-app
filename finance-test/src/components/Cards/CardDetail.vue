
<script>
  import { computed, ref, watch} from 'vue'
  export default {
    setup() {
      const isFreeze = ref(false)
      const isCancel = ref(false)
      const freezeTitle = computed(() => !isFreeze.value ? 'Freeze card' : 'unFreeze card')
      let cardGroup = ref([
        {
          type: 'detail',
          name: 'Card details',
          cardDetail: [],
          isVisible: false
        },
        {
          type: 'transactions',
          name: 'Recent transactions',
          isVisible: true,
          cardDetail: [
           { 
              name: 'Hamleys',
              date: '20 May 2020',
              type: 'Refund on debit card'
            },
            { 
              name: 'Hamleys',
              date: '20 May 2020',
              type: 'Charged to debit card'
            },
            { 
              name: 'Hamleys',
              date: '20 May 2020',
              type: 'Refund on debit card'
            },
            { 
              name: 'Hamleys',
              date: '20 May 2020',
              type: 'Charged to debit card'
            }
          ]
        }
      ]);
  
      watch(cardGroup, (newValue, prevCount) => {
       cardGroup = newValue
      });
  
      const enter = (element) => {
        const width = getComputedStyle(element).width;
  
        element.style.width = width;
        element.style.position = 'absolute';
        element.style.visibility = 'hidden';
        element.style.height = 'auto';
  
        const height = getComputedStyle(element).height;
  
        element.style.width = null;
        element.style.position = null;
        element.style.visibility = null;
        element.style.height = 0;
  
        getComputedStyle(element).height;
  
        requestAnimationFrame(() => {
          element.style.height = height;
        });
      }
  
      const afterEnter = (element) =>{
        element.style.height = 'auto';
      }
      
      const leave = (element) => {
        const height = getComputedStyle(element).height;
        
        element.style.height = height;
  
        getComputedStyle(element).height;
  
        requestAnimationFrame(() => {
          element.style.height = 0;
        });
      }

      const onFreezeCard = () => {
        return isFreeze.value = !isFreeze.value
      }
      const onCancelCard = () => {
        return isCancel.value = !isCancel.value
      }

      return {
        cardGroup,
        enter,
        afterEnter,
        leave,
        isFreeze,
        onFreezeCard,
        onCancelCard,
        isCancel,
        freezeTitle,
      }
    },
     
  }
   
  </script>
  <template>
  <div class="cardDetail_container flex flex-col">
    <div class="cardDetail__header rounded-t-3xl">
      <ul class="grow">
        <li :class="{'active': isFreeze}">
          <a href="javascript:void(0)" @click="onFreezeCard()">
            <img src="@/assets/images/Freeze_card.svg">
            <span class="nav-text">{{freezeTitle}}</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="@/assets/images/Spend_limit.svg">
            <span class="nav-text">Set spend limit</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="@/assets/images/GPay.svg">
            <span class="nav-text">Add to GPay</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="@/assets/images/Replace_card.svg">
            <span class="nav-text">Replace card</span>
          </a>
        </li>
        <li :class="{'active': isCancel}">
          <a href="javascript:void(0)" @click="onCancelCard()">
            <img src="@/assets/images/Deactivate_card.svg">
            <span class="nav-text">Cancel card</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="cardDetail__content">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item" v-for="(item, index) in cardGroup" :key="index">
          <h2 class="accordion-header" id="headingOne">
            <button @click="item.isVisible = !item.isVisible" class="drop-shadow-sm accordion-button" :class="{collapsed: item.isVisible}" type="button">
              {{item.name}}
            </button>
          </h2>
            <Transition
              name="custom-classes"
              @enter="enter"
              @after-enter="afterEnter"
              @leave="leave"
            >
            <div class="accordion-collapse" v-if="item.isVisible && item.cardDetail.length">
              <div class="accordion-body grid grid-flow-row auto-rows-auto gap-4">
                <div class="card-info grid grid-flow-col auto-cols-auto gap-4" v-for="(item2, index2) in item.cardDetail" :key="index2">
                  <div class="card-info__icon">
                    <span>
                      <img src="@/assets/images/file-storage.svg">
                    </span>
                  </div>
                  <div class="card-info__content">
                    <p class="name">{{item2.name}}</p>
                    <span class="date">{{item2.date}}</span>
                    <div class="flex gap-1 refund-card">
                      <span class="refund-icon-card">
                        <img src="@/assets/images/business-and-finance.svg">
                      </span>
                      <span>{{item2.type}}</span>
                    </div>
                  </div>
                   <div class="card-info__price flex gap-2 items-baseline">
                    <span>+ S$ 150 </span>
                    <img src="@/assets/images/next.svg">
                  </div>
                </div>
              </div>
              <div class="load-more">
                <span>View all card transactions</span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.accordion-collapse {
  transition: all 1s ease;
  overflow: hidden;
}
.cardDetail_container {
  height: calc(100% - 200px);
  position: relative;
  top: 510px;
}
.cardDetail {
  &__header {
    background-color: #EDF3FF;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    ul {
      display: flex;
      flex-direction: row;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      padding: 1.5rem 2rem;
      li {
        list-style: none;
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        &.active {
          span {
            font-weight: bold;
          }
        }
        a {
          color: #0C365A;
          font-size: 10pt;
          text-align: center;
          &:hover {
            background-color: transparent;
          }
          img {
            margin: auto;
            height: 32px;
          }
        }
      }
    }
  }
  &__content {
    background-color: #fff;
    padding: 24pt;
    margin-bottom: 3.5rem;
    .accordion {
      .accordion-item {
        border: 1px solid #F5F5F5;
        background-color: #fff;
        border-radius: 8pt;
        margin-bottom: 18pt;
        &:last-child {
          margin-bottom: 0;
        }
        .collapsed {
          &:after {
            background-image: url('@/assets/images/down-arrow-up.svg');
          }
        }
      }
      .accordion-body {
        padding: 1.25rem
      }
      .accordion-button {
        border-radius: calc(8pt - 1px);
        display: flex;
        width: 100%;
        padding: 1rem 1.25rem;
        font-weight: bold;
        font-size: 14pt;
        color: #0C365A;
        background-color: #FAFCFF;
        &:before {
          flex-shrink: 0;
          width: 18pt;
          height: 18pt;
          content: "";
          background-image: url('@/assets/images/Group11889.svg');
          background-repeat: no-repeat;
          background-size: 18pt;
          transition: transform .2s ease-in-out;
        }
        &:after {
          flex-shrink: 0;
          width: 15pt;
          height: 15pt;
          margin-left: auto;
          content: "";
          background-image: url('@/assets/images/down-arrow.svg');
          background-repeat: no-repeat;
          background-size: 15pt;
          transition: transform .2s ease-in-out;
        }
      }
    }
    .load-more {
      text-align: center;
      background-color: #EDFFF5;
      border: 1px solid #DDFFEC;
      border-bottom-left-radius: 8pt; 
      border-bottom-right-radius: 8pt;
      padding: 1rem 1.25rem;
      span {
        font-size: 10pt;
        font-weight: bold;
        color: #01D167;
      }
    }
  }
}
.card-info {
  border-bottom: 1px solid #F5F5F5;
  padding-bottom: 1rem;
  &:last-child {
    border: 0
  }
  &__icon {
    span {
      width: 48px;
      height: 48px;
      padding: 16px;
      background-color: #009DFF1A;
      border-radius: 50%;
      display: inline-block;
    }
  }
  &__content {
    .name {
      color: #222222;
      font-weight: bold;
      font-size: 10pt;
    }
    .date {
      color: #AAAAAA;
      font-size: 10pt;
    }
    .refund-card {
      .refund-icon-card {
        width: 24px;
        height: 20px;
        display: inline-block;
        padding: 6px 7px 7px 7px;
        background-color: #325BAF;
        border-radius: 16px;
      }
      span {
        color: #325BAF;
        font-weight: bold;
        font-size: 9pt;
      }
    }
  }
  &__price {
    span {
      color: #01D167;
      font-weight: bold;
      font-size: 10pt;
    }
    img {
      width: 4.5pt;
      height: 10pt;
    }
  }
}
</style>