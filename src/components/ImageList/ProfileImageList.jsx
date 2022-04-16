import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${size * cols}&h=${
			size * rows
		}&fit=crop&auto=format&dpr=2 2x`,
	};
}

export const ProfileImageList = () => {
	return (
		<ImageList
			sx={{ width: '100%', height: 246 }}
			variant='quilted'
			cols={4}
			rowHeight={121}
		>
			{itemData.map((item) => (
				<ImageListItem
					key={item.img}
					cols={item.cols || 1}
					rows={item.rows || 1}
				>
					<img
						{...srcset(item.img, 121, item.rows, item.cols)}
						alt={item.title}
						loading='lazy'
						style={{
							width: '100%',
						}}
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
};

const itemData = [
	{
		img: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Breakfast',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Burger',
	},
	{
		img: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Camera',
	},
	{
		img: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Coffee',
		cols: 2,
	},
	// {
	// 	img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
	// 	title: 'Hats',
	// 	cols: 2,
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
	// 	title: 'Honey',
	// 	author: '@arwinneil',
	// 	rows: 2,
	// 	cols: 2,
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
	// 	title: 'Basketball',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
	// 	title: 'Fern',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
	// 	title: 'Mushrooms',
	// 	rows: 2,
	// 	cols: 2,
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
	// 	title: 'Tomato basil',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
	// 	title: 'Sea star',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
	// 	title: 'Bike',
	// 	cols: 2,
	// },
];
