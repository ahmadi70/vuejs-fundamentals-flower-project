Vue.component("product", {
	props:{
		y:{
			type:Boolean,
			required: true
		}
	},
	template: `
	<div class="product">
        <div class="product-image">
            <img :src="image" :alt="altTxt" />
        </div>

        <div class="product-info">
			<h1>{{ title }} </h1>
			<p>Shipping: {{shipping}}</p>
            <p v-show="stock">in stock</p>
            <p>{{details}}</p>
            
            <h3>Colors</h3>
            <div 
            v-for="f in variants"
            class="color-box" 
            :style="{backgroundColor: f.color}"
            @mouseover="changeColor(f.image)"
            >
            </div>

			<button @click="addtocart">Add to Cart</button>
			
			
		</div>
		<div>
		<h3>
		Review
		</h3>
		<ul>
		<li v-for="item of reviews">
		<p>
		{{item.name}}
		</p>
		<p>
		Rating: {{item.rating}}
		</p>
		<p>
		{{item.msg}}
		</p>
		</li>
		</ul>
		</div>

		<product-review @on-submitted="result"></product-review>
    </div>
	`
	,
	data(){
		return{

		brand: "Flowerstation",
		product: "Rose",
		image: "./assets/img/red.png",
		altTxt: "white flower",
		stock: false,
		details: `With over 2,000 varieties and hundreds of years of cultivation, the rose has an extensive family and a long history. Old roses, which are classified as existing prior to the 1867 tea rose, generally have more fragrance, more complicated blooms and greater disease resistance. Modern roses offer an endless color selection and all-season blooms.`,
		variants: [
			{color: "white",
			image: "./assets/img/white.png"
		},
		{color: "blue",
			image: "./assets/img/red.png"
		},
		{color: "red",
			image: "./assets/img/white.png"
		}
		],
		reviews:[]
		}
	},
	methods:{
		changeColor(imgsrc){
			this.image = imgsrc;
		},
		addtocart(){
			this.$emit('add-to-cart')
		},
		result(productReview){
			this.reviews.push(productReview)
		}

	},
	computed: {
		title(){
			return this.brand + " " + this.product;
		},
		shipping(){
			if(this.y){
				return "Free"
			}
			return "20Af"
		}
	}

})

Vue.component("product-review", {
	template:`
	<div>
	<p>
		<p v-for="e of errors">{{e}}</p>
	</p>
	<form class="review-form" @submit.prevent="submitted">
		<p>
		<input v-model="name" />
		</p>
		<p>
		Rating: 
		<select v-model="rating">
		<option>3</option>
		<option>2</option>
		<option>1</option>
		</select>
		</p>
		<p>
		<textarea v-model="msg">
		</textarea>
		</p>
		<p>
		<input type="submit" value="Submit">
		</p>
	</form>
	</div>
	`,
	data(){
		return{
			name: null,
			rating: null,
			msg: null,
			errors:[]
		}
	},
	methods:{
		submitted(){
			if(this.name && this.rating && this.msg){
				let productReview={
					name: this.name,
					rating: this.rating,
					msg: this.msg
				}
				this.name=null;
				this.rating=null;
				this.msg=null;
			}
			else{
				if(!this.name){
					this.errors.push("Name is required")
				}
				if(!this.rating){
					this.errors.push("Rating is required")
				}
				if(!this.msg){
					this.errors.push("Message is required")
				}
			}
			

			this.$emit('on-submitted', productReview)
		}
	}
})

const app = new Vue({
	el: "#app",
	data:{
		x: false,
		cart: 0
	},
	methods:{
		updateCart(){
			this.cart++;
		}
	}
	
})