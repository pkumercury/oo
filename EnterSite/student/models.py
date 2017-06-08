from django.db import models


class EntryInfo(models.Model):
    name = models.CharField(max_length=255)             # 名字
    gender = models.BooleanField(default=True)          # 性别
    age = models.IntegerField(default=17)               # 年龄

    province = models.CharField(max_length=255)         # 户籍所在地
    city = models.CharField(max_length=255)
    county = models.CharField(max_length=255)

    high_school = models.CharField(max_length=1023)     # 所在高中
    ncee_id = models.IntegerField()                     # 高考报名号
    department = models.BooleanField(default=True)      # 文理
    card_id = models.IntegerField()                     # 身份证号
    STATUS = (
        (0, '审核中'),
        (1, '已通过'),
        (2, '未通过'),
    )
    status = models.IntegerField(choices=STATUS, default=0)     # 审查状态
    exam_num = models.IntegerField(null=True)                   # 准考证号
    acquired_glories = models.TextField(null=True)              # 获得的荣誉

    def to_dict(self):
        gender = '男' if self.gender else '女'
        department = '理' if self.department else '文'
        return dict(
            name=self.name,
            gender=gender,
            age=str(self.age),
            province=self.province,
            city=self.city,
            county=self.county,
            high_school=self.high_school,
            ncee_id=str(self.ncee_id),
            department=department,
            card_id=str(self.card_id),
            status=str(self.status),
            exam_num=str(self.exam_num),
            acquired_glories=self.acquired_glories,
        )


class Student(models.Model):

    STATUS = (
        (0, '未提交'),
        (1, '已提交'),
        (2, '已放弃'),
    )

    editable = models.IntegerField(choices=STATUS, default=0)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    entry_info = models.ForeignKey(EntryInfo, null=True)
    first_login = models.BooleanField(default=True)
