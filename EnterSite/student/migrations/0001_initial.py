# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-05-16 05:35
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EntryInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('gender', models.BooleanField(default=True)),
                ('age', models.IntegerField(default=17)),
                ('province', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('county', models.CharField(max_length=255)),
                ('high_school', models.CharField(max_length=1023)),
                ('ncee_id', models.IntegerField()),
                ('department', models.BooleanField(default=True)),
                ('card_id', models.IntegerField()),
                ('status', models.IntegerField(choices=[(0, '审核中'), (1, '已通过'), (2, '未通过')], default=0)),
                ('exam_num', models.IntegerField(null=True)),
                ('acquired_glories', models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('editable', models.BooleanField(default=True)),
                ('email', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('first_login', models.BooleanField(default=True)),
                ('entry_info', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='student.EntryInfo')),
            ],
        ),
    ]
