import {Helmet} from 'react-helmet-async'

const Meta = ({title, description, keywords}) => {
	return(
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description}/>
			<meta name="keywords" content={keywords}/>
		</Helmet>
	)
}

Meta.defaultProps = {
	title: "Bem vindo ao MetalShop",
	description: "Venda de roupas de Metal",
	keywords: 'metal, tshirts'
}

export default Meta