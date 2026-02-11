from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Job

from .serializers import RegisterSerializer, JobsSerializer,ApplicationSerializer,Application


@api_view(['GET'])
def hello_api(request):
    return Response({"message":"hello from django API"})

@api_view(['POST'])
def register_user(request):
    serializer=RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"massage":"user register successfully!"},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def basic_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # ✅ pass request explicitly
    user = authenticate(request=request, username=username, password=password)

    if user is not None:
        return Response(
            {
                "user_id": user.id,
                "username": user.username,
                "message": "Login successfully"
            },
            status=status.HTTP_200_OK
        )

    return Response(
        {"message": "Invalid credentials"},
        status=status.HTTP_400_BAD_REQUEST
    )



@api_view(['GET'])
def job_list(request):
    jobs = Job.objects.all()
    serializer = JobsSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def apply_job(request):
    job_id = request.data.get("job")
    applicant_id = request.data.get("applicant")

    # 1️⃣ Check duplicate application
    if Application.objects.filter(
        job_id=job_id,
        applicant_id=applicant_id
    ).exists():
        return Response(
            {"message": "You have already applied for this job"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 2️⃣ Create application
    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Application Submitted"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




