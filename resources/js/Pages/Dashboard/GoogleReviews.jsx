import { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function GoogleReviews({ reviews }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { data, setData, post, processing, reset, errors } = useForm({
    json_file: null,
  });
  const { flash } = usePage().props;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setData("json_file", e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("google-reviews.upload"), {
      preserveScroll: true,
      onSuccess: () => {
        setSelectedFile(null);
        reset();
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Google Reviews" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Google Reviews</h1>
            <p className="text-muted-foreground">Manage your Google Reviews data</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Google Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Success/Error Messages */}
            {flash && flash.success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                {flash.success}
              </div>
            )}
            {flash && flash.error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {flash.error}
              </div>
            )}

            {/* File Upload Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="mb-4">
                <label htmlFor="json_file" className="block text-sm font-medium text-gray-700">
                  Upload JSON File
                </label>
                <input
                  type="file"
                  id="json_file"
                  name="json_file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
                {errors.json_file && (
                  <p className="mt-1 text-sm text-red-600">{errors.json_file}</p>
                )}
              </div>
              <div className="flex items-center justify-end">
                <Button type="submit" disabled={!selectedFile || processing}>
                  {processing ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </form>

            {/* Reviews Display */}
            {reviews && reviews.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                      <div className="flex items-center mb-3">
                        <img
                          src={review.reviewerPhotoUrl}
                          alt="Reviewer"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.stars ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{review.text}</p>
                      <p className="text-xs text-gray-500">{review.categoryName}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No reviews uploaded yet. Please upload a JSON file with Google Reviews data.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
