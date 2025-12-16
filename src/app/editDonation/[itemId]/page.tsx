import '../globals.css'
import Image from 'next/image';
import DonorNav from "@/app/components/donorNavigation";

import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { useRouter, useParams } from 'next/navigation';

interface DonationItem {
    ItemID: string;
    Category: string;
    Description: string | null;
    Colour: string | null;
    Brand: string | null;
    ClothingSize: string | null;
    ImageID: string;
    currentImageServerName: string;
}

export default function EditDonation() {

 const router = useRouter();
 const params = useParams();
 const itemId = Array.isArray(params.itemId) ? params.itemId[0] : params.itemId;
    

  return (
    <main>
        <header>
            <DonorNav />
        </header>

        {/* container1 */}
                <div className="relative w-full max-w-5xl h-130 mx-auto mt-20">
        
                    {/* container2 */}
                    <div className="absolute h-fit inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
                    
                    {error && <div className="text-red-700 bg-red-100 p-3 mb-4 rounded font-semibold">{error}</div>}
                  {successMessage && <div className="text-green-700 bg-green-100 p-3 mb-4 rounded font-semibold">{successMessage}</div>}
                    
                    {/* container3 */}
                    <div className="flex space-x-6 h-full">
                        {/* container 4 */}
                        <div className="w-1/3 flex  flex-col justify-center items-center">
                            {/* Item Image*/}
                            <Image 
                            src={previewUrl || `/images/${item.currentImageServerName}`}
                            alt={selectedFile ? `New ${item.Category} image preview` : `${item.Category} image`}
                            width={500} 
                            height={300} 
                            className="mr-1 inline-block w-70  h-130 rounded-md " 
                        />
        
                        </div>
                        {/* col2 */}
                        {/* container 5 */}
                        <div className="w-1/3 flex  flex-col justify-center items-center">
                                <div className="  relative w-full p-4 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                                    <div className='inline-block  rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3'>Edit Details</div>
                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <div>
                                            {/* NAME */}
                                            <label htmlFor="category" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Item Name
                                            </label>
                                            <input
                                                type="text"
                                                id='category'
                                                name='category'
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                           border border-gray-200 rounded py-3 px-4 mb-3 
                                                           leading-tight focus:outline-none focus:bg-white'  
                                                placeholder="Enter Item Name"
                                            />
                                            {/* DESCRIPTION */}
                                            <label htmlFor='description' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                id='description'
                                                name='description'
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                           border border-gray-200 rounded py-3 px-4 mb-3 
                                                           leading-tight focus:outline-none focus:bg-white' 
                                                placeholder="Enter Item Description"
                                            />
                                             <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                             {/* COLOUR */}
                                                <label htmlFor="colour" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Colour</label>
                                                <select
                                                    id="colour"
                                                    name="colour"
                                                    value={formData.colour}
                                                    onChange={handleInputChange}
                                                    className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                           border border-gray-200 rounded py-3 px-4 mb-3 
                                                           leading-tight focus:outline-none focus:bg-white' 
                                                > 
                                                    {availableColours.map((colour) => (
                                                        <option key={colour} value={colour}>
                                                            {colour}
                                                        </option>
                                                    ))}
                                                </select>
                                                {/* BRAND */}
                                                <label htmlFor="brand" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Brand</label>
                                                <input
                                                    type="text"
                                                    id="brand"
                                                    name="brand"
                                                    value={formData.brand}
                                                    onChange={handleInputChange}
                                                    className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                           border border-gray-200 rounded py-3 px-4 mb-3 
                                                           leading-tight focus:outline-none focus:bg-white' 
                                                />
                                             </div>
                                             {/* SIZE */}
                                            <label htmlFor="clothingSize" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Size</label>
                                            <select
                                                    id="clothingSize"
                                                    name="clothingSize"
                                                    value={formData.clothingSize}
                                                    onChange={handleInputChange}
                                                    className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                           border border-gray-200 rounded py-3 px-4 mb-3 
                                                           leading-tight focus:outline-none focus:bg-white' 
                                                > 
                                                    {availableSizes.map((size) => (
                                                        <option key={size} value={size}>
                                                            {size}
                                                        </option>
                                                    ))}
                                                </select>
                                            {/* IMAGE */}
                                            <label htmlFor="newImageServerName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Upload New Image</label>
                                            <input
                                                type="file"
                                                id="imageFile"
                                                name="imageFile"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className='appearance-none block w-full bg-gray-200 text-gray-700 
                                                           border border-gray-200 rounded py-3 px-4 mb-3 
                                                           leading-tight focus:outline-none focus:bg-white' 
                                            />
                                            {selectedFile && (
                                                <p className='mt-1 text-xs text-[#0C0C0C'>
                                                    File selected: {selectedFile.name}
                                                </p>
                                            )}
                                        </div>
                                <button type='submit' disabled={submitting} className={`mt-4 w-1/2 bg-[#729458] hover:bg-[#B6D99B] text-white font-bold py-2 px-4 rounded-full transition-colors 
                            ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    Submit
                                </button>
                                    </form>
                                </div>
                            </div>
                        {/* Col 3 */}
                        
                        </div>
                    </div>  
                </div>
    </main>
  )
}