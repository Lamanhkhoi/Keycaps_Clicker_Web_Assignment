import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form } from 'react-bootstrap'
import FormField from './FormField'

const GENRES = ['Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Casual']

// Giá trị rỗng cho form THÊM mới
const emptyGame = {
  name: '',
  genre: 'Action',
  price: 0,
  discount: 0,
  image: '',
  description: '',
  developer: '',
  releaseDate: '',
  featured: false,
}

// Form thêm hoặc sửa game cho trang Admin.
// Props:
//   game     = game cần sửa (null khi THÊM mới)
//   onSubmit = hàm của component cha, nhận values khi form hợp lệ
export default function GameForm({ game, onSubmit }) {
  // Thêm mới -> dùng emptyGame. Sửa -> lấy giá trị từ game cũ.
  const startValues =
    game === null
      ? emptyGame
      : {
          name: game.name,
          genre: game.genre,
          price: game.price,
          discount: game.discount,
          image: game.image,
          description: game.description,
          developer: game.developer,
          releaseDate: game.releaseDate,
          featured: game.featured,
        }

  const formik = useFormik({
    initialValues: startValues,
    // Yup mô tả luật kiểm tra từng field. Formik tự chạy khi nhập và khi bấm Lưu.
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên game'),
      price: Yup.number().typeError('Giá phải là số').min(0, 'Giá không được âm').required('Vui lòng nhập giá'),
      discount: Yup.number()
        .typeError('Giảm giá phải là số')
        .min(0, 'Giảm giá từ 0 đến 100')
        .max(100, 'Giảm giá từ 0 đến 100')
        .required('Vui lòng nhập % giảm giá'),
      image: Yup.string().url('Link ảnh không hợp lệ').required('Vui lòng nhập link ảnh'),
      description: Yup.string().min(10, 'Mô tả ít nhất 10 ký tự').required('Vui lòng nhập mô tả'),
      developer: Yup.string().required('Vui lòng nhập nhà phát triển'),
      releaseDate: Yup.string().required('Vui lòng nhập ngày phát hành (ví dụ 2022-02-24)'),
    }),
    onSubmit: (values) => onSubmit(values),
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormField formik={formik} name="name" label="Tên game" />

      <Form.Group className="mb-3" controlId="genre">
        <Form.Label>Thể loại</Form.Label>
        <Form.Select name="genre" value={formik.values.genre} onChange={formik.handleChange}>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <FormField formik={formik} name="price" label="Giá gốc (USD)" type="number" />
      <FormField formik={formik} name="discount" label="Giảm giá (%)" type="number" />
      <FormField formik={formik} name="image" label="Link ảnh" />
      <FormField formik={formik} name="description" label="Mô tả" as="textarea" />
      <FormField formik={formik} name="developer" label="Nhà phát triển" />
      <FormField formik={formik} name="releaseDate" label="Ngày phát hành (YYYY-MM-DD)" />

      <Form.Check
        className="mb-3"
        type="checkbox"
        id="featured"
        name="featured"
        label="Hiển thị ở mục nổi bật ở trang chủ"
        checked={formik.values.featured}
        onChange={formik.handleChange}
      />

      <Button type="submit" variant="success">
        Lưu
      </Button>
    </Form>
  )
}
