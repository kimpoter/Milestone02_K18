import { TextInput, Textarea, Select, Chip, NumberInput, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { useState, useEffect } from 'react';

function AdminDashboardPage() {
    const [categoryData, setCategoryData] = useState([])

    const form = useForm({
        initialValues: {
          name: '',
          description: '',
          address: '',
          addressLink: '',
          timeOpen: '',
          timeClose: '',
          campus: '',
          imageUrl: '',
          distance: '',
          paymentMethods: '',
          platform: '',
          category: '',
          menu: ''
        },
      });

    useEffect(() => {
        fetch("http://localhost:8000/category")
        .then((res) => {
            return res.json()
        }).then((data) => {
            const newCategoryList = []
            data.forEach(category => {
                const newCategory = {}
                newCategory.value = category.name
                newCategory.label = category.name
                newCategoryList.push(newCategory)
            })

            setCategoryData(newCategoryList)
        })
    },[])
      
    return (
        <div className="flex justify-center items-center h-[calc(100vh-104px)]">
            <div className="card">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                    required
                    label="Nama Tempat"
                    {...form.getInputProps('name')}
                    />
                    <Textarea
                    required
                    label="Deskripsi"
                    {...form.getInputProps('description')}
                    />
                    <TextInput
                    required
                    label="Daerah"
                    {...form.getInputProps('address')}
                    />
                    <TextInput
                    required
                    label="Link GMaps"
                    {...form.getInputProps('addressLink')}
                    />
                    <TimeInput
                    required
                    label="Waktu buka"
                    {...form.getInputProps('timeOpen')}
                    />
                    <TimeInput
                    required
                    label="Waktu tutup"
                    {...form.getInputProps('timeClose')}
                    />
                    <Select
                    required
                    label="Kampus"
                    placeholder="Pick one"
                    data={[
                        { value: 'GANESHA', label: 'Ganesha' },
                        { value: 'JATINANGOR', label: 'Jatinangor' },
                    ]}
                    {...form.getInputProps('campus')}
                    />
                    <TextInput
                    required
                    label="Foto Url"
                    {...form.getInputProps('imageUrl')}
                    />
                    <NumberInput
                    required
                    label="Jarak ke ITB"
                    {...form.getInputProps('distance')}
                    />
                    <Chip.Group position="center" multiple mt={15} {...form.getInputProps('paymentMethods')}>
                        <Chip value="cash">cash</Chip>
                        <Chip value="ovo">ovo</Chip>
                        <Chip value="gopay">gopay</Chip>
                        <Chip value="shopeePay">shopeePay</Chip>
                        <Chip value="dana">dana</Chip>
                        <Chip value="transfer">transfer</Chip>
                    </Chip.Group>
                    <Chip.Group position="center" multiple mt={15} {...form.getInputProps('platform')}>
                        <Chip value="langsung">langsung</Chip>
                        <Chip value="shopeeFood">shopeeFood</Chip>
                        <Chip value="goFood">goFood</Chip>
                        <Chip value="grabFood">grabFood</Chip>
                    </Chip.Group>
                    <MultiSelect
                        label="Creatable MultiSelect"
                        data={categoryData}
                        placeholder="Select items"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => {
                            const item = { value: query, label: query };
                            setCategoryData((current) => [...current, item]);
                            return item;
                        }}
                        {...form.getInputProps('category')}
                    />
                    <button type="submit" className="btn-primary sm:text-lg text-base w-full">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AdminDashboardPage;