import {
  TextInput,
  Textarea,
  Select,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import { useState, useContext } from "react";
import PlaceContext from "../PlaceContext";
import axios from "../api/axios";
const ADD_PLACE_URL = `/tempat-makan`;

function AdminDashboardPage() {
  const { categories, platforms, paymentMethods } = useContext(PlaceContext);
  const [categoryData, setCategoryData] = useState(categories);
  const [platformData, setPlatformData] = useState(platforms);
  const [paymentMethodsData, setPaymentMethodsData] = useState(paymentMethods);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      imageUrl: "",
      menuImageUrl: "",
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

  async function onSubmit(values) {
    setLoading(true);
    try {
      const res = await axios.post(ADD_PLACE_URL, JSON.stringify(values), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(res);
    } catch (err) {
      if (!err?.res) {
        console.log("No Server Response");
      } else if (err.res?.status === 409) {
        console.log("Username Taken");
      } else {
        console.log("Registration Failed");
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-104px)] my-64">
      <div className="card">
        <form
          onSubmit={form.onSubmit((values) => onSubmit(values))}
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
          <TextInput
            required
            label="Foto Menu Url"
            {...form.getInputProps("menuImageUrl")}
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
            label="Platform"
            data={platformData}
            placeholder="Masukkan platform"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setPlatformData((current) => [...current, item]);
              return item;
            }}
            {...form.getInputProps("categories")}
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
          <MultiSelect
            label="Cara Pembayaran"
            data={paymentMethodsData}
            placeholder="Masukkan metode"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setPaymentMethodsData((current) => [...current, item]);
              return item;
            }}
            {...form.getInputProps("categories")}
          />
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
