<template>
    <div>
      <div id="slogan" class="text-center">
        <h1>NameGator</h1>
        <br/>
        <h6 class="text-secondary">
          Gerador de nomes com Vue.js, Graphql e Node.
        </h6>
      </div>
      <div id="main">
				<Domain_list></Domain_list>
      </div>
    </div>
  
</template>

<script>

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Domain_list from "./components/Domain_list";

export default {
	name: "App",
	components: {
		Domain_list
	}
};
</script>

<style>
  #slogan {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  #main {
    background-color: #F1F1F1;
    padding-top: 30px;
    padding-bottom: 30px;

  }
</style>
