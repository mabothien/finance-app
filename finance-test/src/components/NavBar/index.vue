<script setup>

</script>
<template>
  <nav class="main-nav footer">
    <ul>
      <li>
        <a href="#">
          <img src="@/assets/images/Home.svg">
          <span class="nav-text">Home</span>
        </a>
      </li>
      <li class="active">
        <a href="#">
          <img src="@/assets/images/cards.svg">
          <span class="nav-text">Cards</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="@/assets/images/Payments.svg">
          <span class="nav-text">Payments</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="@/assets/images/Credit.svg">
          <span class="nav-text">Credit</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="@/assets/images/Account.svg">
          <span class="nav-text">Profile</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss">

.footer {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1030;
}
.main-nav{
  background: #fff;
  box-shadow: 0 -6px 6px 0 #00000014;;
  border-right: 1px solid #e5e5e5;
  ul {
    display: flex;
    flex-direction: row;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      list-style: none;
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
    }
  }
  .active a span {
    font-weight: bold;
    color: #01D167;
  }
  ul li a {
    font-size: 9pt;
    padding: 0.5rem 1rem;
    color: #DDDDDD; 
   
    img {
      margin: auto;
      height: 24px;
    }
  }
}
</style>