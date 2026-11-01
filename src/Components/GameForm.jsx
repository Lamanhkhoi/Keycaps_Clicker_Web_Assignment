import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";

// Form thêm/sửa game cho trang Admin (dùng useFormik + Yup như Exercise 12).
// Props:
//   initialValues  (không bắt buộc) — truyền game cũ khi SỬA, bỏ trống khi THÊM
//   onSubmit(values)               — cha quyết định gọi createGame hay updateGame
export default function GameForm({ initialValues, onSubmit }) {
  const formik = useFormik({
    initialValues: initialValues ?? {
      name: "",
      genre: "Action",
      price: 0,
      discount: 0,
      image: "",
      description: "",
      developer: "",
      releaseDate: "",
      featured: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên game"),
      // TODO: price: Yup.number().min(0)...   discount: min 0, max 100
      //       image: Yup.string().url("URL ảnh không hợp lệ")...  description: required, min length
    }),
    onSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Tên game</Form.Label>
        <Form.Control
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && !!formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
      </Form.Group>

      {/* TODO: các field còn lại (genre, price, discount, image, description, developer, releaseDate, featured)
          — cùng mẫu với field "name" ở trên. touched dùng để làm gì? */}

      <Button type="submit">Lưu</Button>
    </Form>
  );
}
