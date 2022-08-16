import {
  TextInput,
  Textarea,
  Select,
  Chip,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import { useState, useEffect } from "react";

function AdminDashboardPage() {
  const [categoryData, setCategoryData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [paymentMethodsData, setPaymentMethodsData] = useState([]);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      imageUrl: "",
      price: "",
      address: "",
      latitude: "",
      longitude: "",
      timeOpen: "",
      timeClose: "",
      distance: "",
      campus: "",
      categories: "",
      paymentMethods: "",
      platform: "",
      menu: "",
    },
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/category`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCategoryData(res.data);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-104px)] my-64">
      <div className="card">
        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
          className="space-y-4"
        >
          <TextInput
            required
            label="Nama Tempat"
            {...form.getInputProps("name")}
          />
          <Textarea
            required
            label="Deskripsi"
            {...form.getInputProps("description")}
          />
          <TextInput
            required
            label="Foto Url"
            {...form.getInputProps("imageUrl")}
          />
          <NumberInput
            required
            label="Harga rata-rata"
            {...form.getInputProps("price")}
          />
          <TextInput
            required
            label="Daerah"
            {...form.getInputProps("address")}
          />
          <NumberInput
            required
            label="Latitude"
            {...form.getInputProps("latitude")}
          />
          <NumberInput
            required
            label="Longitude"
            {...form.getInputProps("longitude")}
          />
          <TimeInput
            required
            label="Waktu buka"
            {...form.getInputProps("timeOpen")}
          />
          <TimeInput
            required
            label="Waktu tutup"
            {...form.getInputProps("timeClose")}
          />
          <NumberInput
            required
            label="Jarak ke ITB"
            {...form.getInputProps("distance")}
          />
          <Select
            required
            label="Kampus"
            placeholder="Pick one"
            data={[
              { value: "GANESHA", label: "Ganesha" },
              { value: "JATINANGOR", label: "Jatinangor" },
            ]}
            {...form.getInputProps("campus")}
          />
          <MultiSelect
            label="Kategori"
            data={categoryData}
            placeholder="Masukkan kategori"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setCategoryData((current) => [...current, item]);
              return item;
            }}
            {...form.getInputProps("categories")}
          />
          <Chip.Group
            position="center"
            multiple
            mt={15}
            {...form.getInputProps("paymentMethods")}
          >
            <Chip value="cash">cash</Chip>
            <Chip value="ovo">ovo</Chip>
            <Chip value="gopay">gopay</Chip>
            <Chip value="shopeePay">shopeePay</Chip>
            <Chip value="dana">dana</Chip>
            <Chip value="transfer">transfer</Chip>
          </Chip.Group>
          <Chip.Group
            position="center"
            multiple
            mt={15}
            {...form.getInputProps("platform")}
          >
            <Chip value="langsung">langsung</Chip>
            <Chip value="shopeeFood">shopeeFood</Chip>
            <Chip value="goFood">goFood</Chip>
            <Chip value="grabFood">grabFood</Chip>
          </Chip.Group>
          <button
            type="submit"
            className="btn-primary sm:text-lg text-base w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
