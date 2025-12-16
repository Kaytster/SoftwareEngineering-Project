"use client";

import Card from "@/app/components/Card";
import InputField from "@/app/components/InputField";
import TextArea from "@/app/components/TextArea";
import Form from "next/form";
import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllCharities,
  ICategory,
  ICharityStripped,
  postDonation,
} from "../actions";
import StatusPill from "../components/StatusPill";

export default function CreateDonationForm() {
  const [photos, setPhotos] = useState<File[]>([]);
  const [charities, setCharities] = useState<ICharityStripped[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<string>("none");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [feedback, setFeedback] = useState<null | {
    status: number;
    statusText: string | unknown;
  }>(null);

  const feedbackStatusMap: { [key: number]: "success" | "error" | "warning" } =
    {
      200: "success",
      400: "warning",
      401: "error",
      500: "error",
    };

  useEffect(() => {
    getAllCharities().then((res) => {
      if (res.status === 200 && res.data) {
        setCharities(res.data);
      } else {
        console.error(res);
        setFeedback({
          status: res.status,
          statusText: res.statusText,
        });
      }
    });

    getAllCategories().then((res) => {
      if (res.status === 200 && res.data) {
        setCategories(res.data);
      } else {
        console.error(res);
        setFeedback({
          status: res.status,
          statusText: res.statusText,
        });
      }
    });
  }, []);

  function handleSubmission(formData: FormData): void {
    postDonation(formData).then((res) => {
      setFeedback({
        status: res.status,
        statusText: res.statusText,
      });
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
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
    <>
      <Form action={handleSubmission} className="flex justify-center gap-8 m-8">
        <Card title="Images" className="grow-1">
          <div className="bg-light-secondary rounded-lg aspect-3/2 flex items-center justify-center text-lg text-gray-700">
            {photos.length === 0
              ? "No Photos"
              : photos.length + " Photo Uploaded"}
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
                required
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
                required
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
                required
              />
            </div>
          </div>

          <div className="flex gap-8">
            <select
              name="charity"
              id="charity"
              value={selectedCharity}
              onChange={(e) => setSelectedCharity(e.target.value)}
            >
              <option value="none" disabled>
                Choose a charity
              </option>
              {charities.map(
                ({ CharityID, CharityName, Email, PhoneNumber }) => (
                  <option
                    key={CharityID}
                    title={`${Email} ${PhoneNumber}`}
                    value={CharityID}
                  >
                    {CharityName}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="flex gap-8">
            <select
              name="itemCategory"
              id="itemCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              <option value={-1} disabled>
                Choose an item category
              </option>
              {categories.map(({ CategoryID, Description }) => (
                <option key={CategoryID} value={CategoryID}>
                  {Description}
                </option>
              ))}
            </select>
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
      {feedback && (
        <StatusPill
          status={feedbackStatusMap[feedback.status] || "warning"}
          className="mx-auto w-3/4 min-w-max"
        >
          {String(feedback.statusText)}
        </StatusPill>
      )}
    </>
  );
}
