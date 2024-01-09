import { connectMongoDB } from "@/lib/mongodb"
import Job from "@/models/job";
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        const body = await req.json();
        // ownerId eklendi
        // bidDescription eklendi
        const { name,description,price,ownerId,bid,bidAmount,bidDescription } = body
        console.log("BODY BID: ", bidDescription)
        // console.log('Received data:', body);
        
        await connectMongoDB();
        // ownerId eklendi
        // bidDescription eklendi
        await Job.create({ name,description,price,ownerId,bid,bidAmount,bidDescription })
        
        return NextResponse.json({ message: "Job added" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An error occured while adding job" }, { status: 500 })
    }
}
export async function PUT(req) {
        
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const jobId = urlParams.get('id');
        const { bid, bidAmount, bidDescription } = await req.json();
        // console.log(req.body)
        await connectMongoDB();
        

        // jobId'e sahip işi bul ve güncelle
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { bid: bid, bidAmount: bidAmount, bidDescription:bidDescription,
             },
            { new: true }
        );

        if (!updatedJob) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Job updated", updatedJob }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while updating job" }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        const data = req.json()
        const {id} = data  
        // console.log("id: ",id)
        await connectMongoDB();
        // yeni eklendi ici bostu
        const jobs = await Job.find({}, { __v: 0 }); // Tüm işleri getir, _id ve __v hariç
        
        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occured while fetching jobs" }, { status: 500 });
    }
}
export async function DELETE(req) {
    try {
        const { id } = await req.json(); // İsteğin gövdesinden id alınır
        if (!id) {
            throw new Error('ID is required for deletion');
        }
        await connectMongoDB();
        await Job.deleteOne({ _id: id }); // Belirtilen ID'ye sahip işi silme
        return NextResponse.json({ message: "Job deleted" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting job:', error);
        return NextResponse.json({ message: "An error occurred while deleting job" }, { status: 500 });
    }
}
// export async function DELETE(req) {
//     try {
//         const { id, ownerId } = await req.json(); // İsteğin gövdesinden id ve ownerId alınır
//         if (!id) {
//             throw new Error('ID is required for deletion');
//         }
//         await connectMongoDB();
//         const job = await Job.findOne({ _id: id });

//         if (!job) {
//             return NextResponse.json({ message: "Job not found" }, { status: 404 });
//         }

//         // Kullanıcının sadece kendi işlerini silebilmesi kontrolü
//         if (job.ownerId !== ownerId) {
//             return NextResponse.json({ message: "Unauthorized to delete this job" }, { status: 403 });
//         }

//         await Job.deleteOne({ _id: id }); // Belirtilen ID'ye sahip işi silme
//         return NextResponse.json({ message: "Job deleted" }, { status: 200 });
//     } catch (error) {
//         console.error('Error deleting job:', error);
//         return NextResponse.json({ message: "An error occurred while deleting job" }, { status: 500 });
//     }
// }