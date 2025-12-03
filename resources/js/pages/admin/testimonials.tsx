import { Head, Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import AdminLayout from '@/layouts/admin-layout';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  image?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

interface Props {
  testimonials: {
    data: Testimonial[];
  };
}

export default function Testimonials({ testimonials }: Props) {
  const handleDelete = (testimonialId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/testimonials/${testimonialId}`);
      }
    });
  };

  return (
    <AdminLayout>
      <Head title="Testimonials" />
      
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Testimonials Management</h1>
          <Link
            href="/admin/testimonials/create"
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            + Add Testimonial
          </Link>
        </div>
        
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Total testimonials: {testimonials?.data?.length || 0}
          </p>
          
          {!testimonials?.data || testimonials.data.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>No testimonials yet</h3>
              <p style={{ color: '#999', marginBottom: '20px' }}>Create your first testimonial to get started.</p>
              <Link
                href="/admin/testimonials/create"
                style={{
                  backgroundColor: '#16a34a',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Create First Testimonial
              </Link>
            </div>
          ) : (
            <div>
              {testimonials.data.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  style={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '8px', 
                    padding: '16px', 
                    marginBottom: '16px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>
                        {testimonial.name}
                      </h3>
                      <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                        {testimonial.title} - {testimonial.company}
                      </p>
                      <p style={{ margin: '0 0 12px 0', color: '#555', lineHeight: '1.5' }}>
                        {testimonial.content}
                      </p>
                      <span 
                        style={{ 
                          backgroundColor: testimonial.is_active ? '#dcfce7' : '#f3f4f6',
                          color: testimonial.is_active ? '#166534' : '#374151',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {testimonial.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginLeft: '20px' }}>
                      <Link
                        href={`/admin/testimonials/${testimonial.id}`}
                        style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px' }}
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/testimonials/${testimonial.id}/edit`}
                        style={{ color: '#16a34a', textDecoration: 'none', fontSize: '14px' }}
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(testimonial.id)}
                        style={{ 
                          color: '#dc2626', 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontSize: '14px' 
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}