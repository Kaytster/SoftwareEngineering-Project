"use client";

import Card from "@/components/Card";
import InputField from "@/components/InputField";
import TextArea from "@/components/TextArea";
import Form from "next/form";
import React, { useState } from "react";

export default function CreateDonationForm() {
  const [photos, setPhotos] = useState<File[]>([]);

  function handleSubmission(formData: FormData): void {
    // call API / Server Action
    // formData.get("itemName");
  }


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // console.log(e.target.files);
    if (e.target.files === null) {
      setPhotos([]);
      return;
    }

    let fileArr: File[] = [];
    for (let idx = 0; idx < e.target.files.length; idx++) {
      fileArr.push(e.target.files[idx]);
    }
    setPhotos([...fileArr]);
  }

  return (
    <Form action={handleSubmission} className="flex justify-center gap-8">
      <Card title="Images" className="grow-1">
        <div className="bg-light-secondary rounded-lg aspect-3/2 flex items-center justify-center text-lg text-gray-700">
          {photos.length === 0
            ? "No Photos"
            : photos.length + " Photos Uploaded"}
        </div>

        <div className="w-full">
          <label
            htmlFor="itemPhotos"
            className="block w-fit max-w-full bg-primary py-2 px-8 mx-auto rounded-full text-white cursor-pointer"
          >
            Upload photos
          </label>
          <input
            name="itemPhotos"
            id="itemPhotos"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </div>
      </Card>
      <Card title="Create Donation" className="grow-5">
        <div className="flex gap-8">
          <div className="grow-1 shrink-1 basis-0">
            <label htmlFor="itemName">Name</label>
          </div>
          <div className="grow-2 shrink-1 basis-0">
            <InputField
              name="itemName"
              id="itemName"
              type="text"
              className="w-full"
              placeholder="Jeans"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* CSS is weird sometimes,
          so you have to provide all flex-basis, flex-shrink, and flex-grow
          to split items evenly inside a flex container */}
          <div className="grow-1 shrink-1 basis-0">
            <label htmlFor="itemDesc">Description</label>
          </div>
          <div className="grow-2 shrink-1 basis-0">
            <TextArea
              name="itemDesc"
              id="itemDesc"
              className="w-full"
              placeholder="My husband’s work jeans in good condition."
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="grow-1 shrink-1 basis-0">
            <label htmlFor="itemTags">Tags</label>
          </div>
          <div className="grow-2 shrink-1 basis-0">
            <InputField
              name="itemTags"
              id="itemTags"
              type="text"
              className="w-full"
              placeholder="Gray, Male"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="block py-2 px-8 mx-auto w-fit w-max-full bg-primary rounded-full mt-4 text-white cursor-pointer"
          >
            Submit
          </button>
        </div>
      </Card>
    </Form>
  );
}
