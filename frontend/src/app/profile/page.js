"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Camera,
  Save,
  X,
  Edit2,
} from "lucide-react";
import Image from "next/image";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "আহমেদ",
    lastName: "হাসান",
    email: "ahmed.hasan@example.com",
    phone: "+880 1712-345678",
    address: "House 12, Road 5, Dhanmondi, Dhaka-1205",
    bio: "একজন বই প্রেমী এবং নিয়মিত পাঠক। বাংলা সাহিত্য এবং ইতিহাস বিষয়ে বিশেষ আগ্রহী।",
    profileImage: null,
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          {/* Profile Header */}
          <div className="relative bg-linear-to-r from-emerald-500 to-emerald-600 px-6 py-12 text-white">
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-medium backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-emerald-600 transition-colors hover:bg-gray-100"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-medium backdrop-blur-sm transition-colors hover:bg-white/30"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white/20 backdrop-blur-sm">
                  {editData.profileImage ? (
                    <Image
                      src={editData.profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-white/70" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-white p-2 text-emerald-600 shadow-lg transition-colors hover:bg-gray-100">
                    <Camera className="h-5 w-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h1 className="mb-1 text-2xl font-bold">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-white/80">{profileData.email}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="h-4 w-4" />
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) =>
                        setEditData({ ...editData, firstName: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  ) : (
                    <p className="rounded-lg bg-gray-50 px-4 py-2 text-gray-900">
                      {profileData.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="h-4 w-4" />
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) =>
                        setEditData({ ...editData, lastName: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  ) : (
                    <p className="rounded-lg bg-gray-50 px-4 py-2 text-gray-900">
                      {profileData.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                ) : (
                  <p className="rounded-lg bg-gray-50 px-4 py-2 text-gray-900">
                    {profileData.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                ) : (
                  <p className="rounded-lg bg-gray-50 px-4 py-2 text-gray-900">
                    {profileData.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                    rows={2}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                ) : (
                  <p className="rounded-lg bg-gray-50 px-4 py-2 text-gray-900">
                    {profileData.address}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="h-4 w-4" />
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) =>
                      setEditData({ ...editData, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                ) : (
                  <p className="rounded-lg bg-gray-50 px-4 py-2 text-gray-900">
                    {profileData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="mb-4 font-semibold text-gray-900">
              Account Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-white p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">12</p>
                <p className="mt-1 text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="rounded-lg bg-white p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">8</p>
                <p className="mt-1 text-sm text-gray-600">Reviews Written</p>
              </div>
              <div className="rounded-lg bg-white p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">24</p>
                <p className="mt-1 text-sm text-gray-600">Wishlist Items</p>
              </div>
              <div className="rounded-lg bg-white p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">৳15,420</p>
                <p className="mt-1 text-sm text-gray-600">Total Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
